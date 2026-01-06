import { NextRequest, NextResponse } from 'next/server';
import { UPLOAD_AVATAR_PROMPT, getRandomAvatarPrompt, getEditAvatarPrompt } from '@/lib/prompts';
import { RandomConfig } from '@/types/avatar';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent';

type GenerationMode = 'upload' | 'random' | 'edit';

interface GeminiRequestBody {
  contents: Array<{
    role: string;
    parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }>;
  }>;
  generationConfig: {
    temperature: number;
    maxOutputTokens: number;
    responseModalities: string[];
  };
}

/**
 * Build Gemini API request body based on generation mode
 */
function buildRequestBody(
  mode: GenerationMode,
  options: {
    imageBase64?: string;
    imageMimeType?: string;
    randomConfig?: RandomConfig;
    editPrompt?: string;
    editFeatures?: string[];
  }
): GeminiRequestBody {
  const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

  // Add image if present (for upload or edit mode)
  if (options.imageBase64 && options.imageMimeType) {
    parts.push({
      inlineData: {
        mimeType: options.imageMimeType,
        data: options.imageBase64,
      },
    });
  }

  // Add prompt based on mode
  let prompt: string;
  switch (mode) {
    case 'upload':
      prompt = UPLOAD_AVATAR_PROMPT;
      break;
    case 'random':
      prompt = getRandomAvatarPrompt(options.randomConfig || { gender: 'neutral', features: [], prompt: '' });
      break;
    case 'edit':
      prompt = getEditAvatarPrompt(options.editPrompt || 'Make it look cooler', options.editFeatures);
      break;
    default:
      prompt = UPLOAD_AVATAR_PROMPT;
  }

  parts.push({ text: prompt });

  return {
    contents: [{ role: 'user', parts }],
    generationConfig: {
      temperature: mode === 'random' ? 1.0 : 0.8, // Higher creativity for random
      maxOutputTokens: 8192,
      responseModalities: ['IMAGE', 'TEXT'],
    },
  };
}

/**
 * Parse error response and return user-friendly message
 */
function parseErrorMessage(errorText: string): string {
  let userMessage = 'AI generation failed. Please try again.';
  try {
    const errorJson = JSON.parse(errorText);
    if (errorJson.error?.message) {
      const apiMessage = errorJson.error.message;
      if (apiMessage.includes('safety') || apiMessage.includes('blocked')) {
        userMessage = 'Content cannot be processed. Please try different options.';
      } else if (apiMessage.includes('quota') || apiMessage.includes('limit')) {
        userMessage = 'Service temporarily unavailable. Please try again later.';
      } else if (apiMessage.includes('invalid') || apiMessage.includes('format')) {
        userMessage = 'Invalid image format. Please use JPG, PNG, or WEBP.';
      } else if (apiMessage.includes('did not match') || apiMessage.includes('expected pattern')) {
        userMessage = 'Unable to process this request. Please try again.';
      }
    }
  } catch {
    // Keep default message
  }
  return userMessage;
}

/**
 * Extract image from Gemini API response
 */
function extractImageFromResponse(result: Record<string, unknown>): { data: string; mimeType: string } | null {
  const candidates = result.candidates as Array<{
    content?: { parts?: Array<{ inlineData?: { data: string; mimeType?: string }; text?: string }> };
    finishReason?: string;
  }>;

  if (!candidates || candidates.length === 0) {
    return null;
  }

  const parts = candidates[0].content?.parts || [];
  for (const part of parts) {
    if (part.inlineData) {
      return {
        data: part.inlineData.data,
        mimeType: part.inlineData.mimeType || 'image/png',
      };
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const formData = await request.formData();
    const mode = (formData.get('mode') as GenerationMode) || 'upload';

    let requestBody: GeminiRequestBody;

    switch (mode) {
      case 'upload': {
        const file = formData.get('image') as File;
        if (!file) {
          return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
        }
        const arrayBuffer = await file.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString('base64');
        const mimeType = file.type || 'image/jpeg';

        requestBody = buildRequestBody('upload', {
          imageBase64: base64Data,
          imageMimeType: mimeType,
        });
        break;
      }

      case 'random': {
        const gender = (formData.get('gender') as string) || 'neutral';
        const featuresStr = formData.get('features') as string;
        const features = featuresStr ? JSON.parse(featuresStr) : [];
        const prompt = (formData.get('prompt') as string) || '';

        const randomConfig: RandomConfig = {
          gender: gender as 'male' | 'female' | 'neutral',
          features,
          prompt,
        };

        requestBody = buildRequestBody('random', { randomConfig });
        break;
      }

      case 'edit': {
        const baseImageData = formData.get('baseImage') as string;
        const editPrompt = formData.get('editPrompt') as string;
        const editFeaturesStr = formData.get('editFeatures') as string;
        const editFeatures = editFeaturesStr ? JSON.parse(editFeaturesStr) : [];

        if (!baseImageData) {
          return NextResponse.json({ error: 'No base image provided for editing' }, { status: 400 });
        }
        if (!editPrompt && editFeatures.length === 0) {
          return NextResponse.json({ error: 'Please provide edit instructions' }, { status: 400 });
        }

        // baseImage should be base64 without data URL prefix
        const base64Data = baseImageData.includes(',') ? baseImageData.split(',')[1] : baseImageData;

        requestBody = buildRequestBody('edit', {
          imageBase64: base64Data,
          imageMimeType: 'image/png',
          editPrompt,
          editFeatures,
        });
        break;
      }

      default:
        return NextResponse.json({ error: 'Invalid generation mode' }, { status: 400 });
    }

    console.log(`Calling Gemini API for ${mode} avatar generation...`);

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return NextResponse.json({ error: parseErrorMessage(errorText) }, { status: response.status });
    }

    const result = await response.json();
    console.log('Gemini API response received');

    // Check for error in success response
    if (result.error) {
      console.error('Gemini returned error:', result.error);
      return NextResponse.json(
        { error: parseErrorMessage(JSON.stringify(result)) },
        { status: 400 }
      );
    }

    // Check for blocked content
    if (result.promptFeedback?.blockReason) {
      console.error('Content blocked:', result.promptFeedback);
      return NextResponse.json(
        { error: 'Content cannot be processed. Please try different options.' },
        { status: 400 }
      );
    }

    // Check finish reason for safety
    const candidates = result.candidates;
    if (candidates?.[0]?.finishReason === 'SAFETY') {
      return NextResponse.json(
        { error: 'Content blocked due to safety restrictions. Please try different options.' },
        { status: 400 }
      );
    }

    // Extract image
    const imageData = extractImageFromResponse(result);
    if (!imageData) {
      console.error('No image in response');
      return NextResponse.json(
        { error: 'AI could not generate an avatar. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      avatar: {
        data: imageData.data,
        mimeType: imageData.mimeType,
      },
    });
  } catch (error) {
    console.error('Avatar generation error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    let userMessage = 'Something went wrong. Please try again.';

    if (errorMessage.includes('fetch')) {
      userMessage = 'Connection error. Please check your internet and try again.';
    }

    return NextResponse.json({ error: userMessage }, { status: 500 });
  }
}
