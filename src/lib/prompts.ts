/**
 * Prompt templates for avatar generation
 */

import { RandomConfig } from '@/types/avatar';

// Base pixel avatar style requirements
const PIXEL_STYLE_BASE = `
STYLE REQUIREMENTS:
- Create a square-format pixel avatar (like Minecraft or CryptoPunks style)
- Use a limited color palette (16-32 colors maximum)
- Sharp pixel edges, no anti-aliasing or smooth gradients
- Chunky, blocky features
- Each "pixel" should be clearly visible as a distinct square block
- Size should appear as if it's a 32x32 or 64x64 pixel grid upscaled

COMPOSITION:
- Center the face/head in the frame
- Include simple shoulders/neck hint at bottom
- Use a solid or simple gradient background color
- Face should take up 70-80% of the avatar space

OUTPUT:
- Clean, crisp pixel art
- Professional quality suitable for profile pictures
- Fun, approachable aesthetic
- Instantly recognizable as a stylized pixel avatar`;

/**
 * Prompt for transforming a photo into pixel avatar
 */
export const UPLOAD_AVATAR_PROMPT = `Transform this photo into a stylized pixel art avatar with these specifications:

${PIXEL_STYLE_BASE}

FEATURES TO PRESERVE:
- Distinctive facial features (glasses, beard, hair style, etc.)
- General skin tone and hair color
- Expression/mood of the original photo
- Any notable accessories

IMPORTANT: Keep the overall vibe playful and modern, like popular pixel avatar NFTs or gaming avatars.`;

/**
 * Prompt for generating random avatar
 */
export const getRandomAvatarPrompt = (config: RandomConfig): string => {
  const genderDesc = config.gender === 'neutral'
    ? 'a character (any gender)'
    : `a ${config.gender} character`;

  const featuresDesc = config.features.length > 0
    ? `\n- Features to include: ${config.features.join(', ')}`
    : '';

  const customDesc = config.prompt
    ? `\n- Additional details: ${config.prompt}`
    : '';

  return `Generate a unique pixel art avatar of ${genderDesc} with these specifications:

${PIXEL_STYLE_BASE}

CHARACTER DETAILS:
- Gender: ${config.gender}${featuresDesc}${customDesc}
- Make the character interesting and memorable
- Add personality through expression and small details

IMPORTANT:
- Create an original, unique character
- Keep the overall vibe playful and modern
- Make it suitable as a profile picture`;
};

/**
 * Prompt for editing an existing avatar
 */
export const getEditAvatarPrompt = (editPrompt: string, features?: string[]): string => {
  const featuresDesc = features && features.length > 0
    ? `\n- New features to add: ${features.join(', ')}`
    : '';

  return `Modify this existing pixel avatar while maintaining the same style:

CHANGES REQUESTED:
- ${editPrompt}${featuresDesc}

STYLE REQUIREMENTS (MUST MAINTAIN):
- Keep the same pixel art style (32x32 or 64x64 upscaled look)
- Keep the same color palette style
- Keep the same overall composition
- Maintain character recognition

OUTPUT:
- Modified pixel avatar
- Same quality and style as original
- Only apply the requested changes
- Keep the avatar instantly recognizable`;
};
