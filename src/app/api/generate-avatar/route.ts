import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Pixel avatar generation prompt - optimized for square pixel art style
const PIXEL_AVATAR_PROMPT = `Transform this photo into a stylized pixel art avatar with these specifications:

STYLE REQUIREMENTS:
- Create a square-format pixel avatar (like Minecraft or CryptoPunks style)
- Use a limited color palette (16-32 colors maximum)
- Sharp pixel edges, no anti-aliasing or smooth gradients
- Chunky, blocky features that capture the essence of the original face
- Each "pixel" should be clearly visible as a distinct square block
- Size should appear as if it's a 32x32 or 64x64 pixel grid upscaled

COMPOSITION:
- Center the face/head in the frame
- Include simple shoulders/neck hint at bottom
- Use a solid or simple gradient background color
- Face should take up 70-80% of the avatar space

FEATURES TO PRESERVE:
- Distinctive facial features (glasses, beard, hair style, etc.)
- General skin tone and hair color
- Expression/mood of the original photo
- Any notable accessories

OUTPUT:
- Clean, crisp pixel art
- Professional quality suitable for profile pictures
- Fun, approachable aesthetic
- Instantly recognizable as a stylized version of the person

IMPORTANT: Keep the overall vibe playful and modern, like popular pixel avatar NFTs or gaming avatars.`;

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type || 'image/jpeg';

    // Prepare request to Gemini API
    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data
              }
            },
            {
              text: PIXEL_AVATAR_PROMPT
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 8192,
        responseModalities: ['IMAGE', 'TEXT']
      }
    };

    console.log('Calling Gemini API for pixel avatar generation...');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);

      // Parse error for more specific messages
      let userMessage = 'AI generation failed. Please try again.';
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error?.message) {
          // Map common errors to user-friendly messages
          const apiMessage = errorJson.error.message;
          if (apiMessage.includes('safety') || apiMessage.includes('blocked')) {
            userMessage = 'This image cannot be processed. Please try a different photo.';
          } else if (apiMessage.includes('quota') || apiMessage.includes('limit')) {
            userMessage = 'Service temporarily unavailable. Please try again later.';
          } else if (apiMessage.includes('invalid') || apiMessage.includes('format')) {
            userMessage = 'Invalid image format. Please use JPG, PNG, or WEBP.';
          } else if (apiMessage.includes('did not match') || apiMessage.includes('expected pattern')) {
            userMessage = 'Unable to process this image. Please try a clearer face photo.';
          }
        }
      } catch {
        // Keep default message
      }

      return NextResponse.json(
        { error: userMessage },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('Gemini API response structure:', JSON.stringify(result, null, 2).substring(0, 500));

    // Check for error in success response (Gemini sometimes returns 200 with error)
    if (result.error) {
      console.error('Gemini returned error in success response:', result.error);
      let userMessage = 'AI generation failed. Please try again.';
      const errorMessage = result.error.message || '';
      if (errorMessage.includes('did not match') || errorMessage.includes('expected pattern')) {
        userMessage = 'Unable to process this image. Please try a clearer face photo.';
      } else if (errorMessage.includes('safety') || errorMessage.includes('blocked')) {
        userMessage = 'This image cannot be processed. Please try a different photo.';
      }
      return NextResponse.json(
        { error: userMessage },
        { status: 400 }
      );
    }

    // Check for blocked content or safety filters
    if (result.promptFeedback?.blockReason) {
      console.error('Content blocked:', result.promptFeedback);
      return NextResponse.json(
        { error: 'This image cannot be processed. Please try a different photo.' },
        { status: 400 }
      );
    }

    // Extract image from response
    const candidates = result.candidates;
    if (!candidates || candidates.length === 0) {
      // Check if there's a safety filter issue
      if (result.candidates?.[0]?.finishReason === 'SAFETY') {
        return NextResponse.json(
          { error: 'This image cannot be processed due to content restrictions. Please try a different photo.' },
          { status: 400 }
        );
      }
      console.error('No candidates in response:', JSON.stringify(result, null, 2));
      return NextResponse.json(
        { error: 'AI could not generate an avatar. Please try a different photo.' },
        { status: 500 }
      );
    }

    // Check finish reason
    const finishReason = candidates[0].finishReason;
    if (finishReason && finishReason !== 'STOP' && finishReason !== 'MAX_TOKENS') {
      console.error('Unexpected finish reason:', finishReason);
      if (finishReason === 'SAFETY') {
        return NextResponse.json(
          { error: 'This image cannot be processed due to content restrictions. Please try a different photo.' },
          { status: 400 }
        );
      }
    }

    const parts = candidates[0].content?.parts || [];
    let imageData = null;
    let textResponse = null;

    for (const part of parts) {
      if (part.inlineData) {
        imageData = {
          data: part.inlineData.data,
          mimeType: part.inlineData.mimeType || 'image/png'
        };
      }
      if (part.text) {
        textResponse = part.text;
      }
    }

    if (!imageData) {
      console.error('No image in response. Text response:', textResponse);

      // Check if text response contains error hints
      let errorMessage = 'AI could not generate an avatar from this photo.';
      if (textResponse) {
        if (textResponse.includes('cannot') || textResponse.includes('unable')) {
          errorMessage = 'Unable to process this image. Please try a clearer face photo.';
        } else if (textResponse.includes('inappropriate') || textResponse.includes('policy')) {
          errorMessage = 'This image cannot be processed. Please try a different photo.';
        }
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    // Return the generated avatar
    return NextResponse.json({
      success: true,
      avatar: {
        data: imageData.data,
        mimeType: imageData.mimeType
      }
    });

  } catch (error) {
    console.error('Avatar generation error:', error);

    // Check for specific error messages
    const errorMessage = error instanceof Error ? error.message : String(error);
    let userMessage = 'Something went wrong. Please try again.';

    if (errorMessage.includes('did not match') || errorMessage.includes('expected pattern')) {
      userMessage = 'Unable to process this image. Please try a clearer face photo.';
    } else if (errorMessage.includes('fetch')) {
      userMessage = 'Connection error. Please check your internet and try again.';
    }

    return NextResponse.json(
      { error: userMessage },
      { status: 500 }
    );
  }
}

// Next.js App Router handles FormData natively, no config needed
