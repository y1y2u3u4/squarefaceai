// Avatar generation types

export type InputMode = 'upload' | 'random';
export type Gender = 'male' | 'female' | 'neutral';

export interface RandomConfig {
  gender: Gender;
  features: string[];
  prompt: string;
}

export interface GenerateOptions {
  mode: InputMode;
  // Upload mode
  image?: File;
  // Random mode
  randomConfig?: RandomConfig;
}

export interface EditOptions {
  prompt: string;
  gender?: Gender;
  features: string[];
}

export interface GeneratedAvatar {
  dataUrl: string;
  mimeType: string;
  timestamp: number;
}

// Feature options for random generation
export const FEATURE_OPTIONS = {
  hairColor: [
    { value: 'black', label: 'Black' },
    { value: 'brown', label: 'Brown' },
    { value: 'blonde', label: 'Blonde' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'pink', label: 'Pink' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
  ],
  hairStyle: [
    { value: 'short', label: 'Short' },
    { value: 'long', label: 'Long' },
    { value: 'curly', label: 'Curly' },
    { value: 'straight', label: 'Straight' },
    { value: 'ponytail', label: 'Ponytail' },
    { value: 'twintails', label: 'Twintails' },
    { value: 'bald', label: 'Bald' },
  ],
  accessories: [
    { value: 'glasses', label: 'Glasses' },
    { value: 'sunglasses', label: 'Sunglasses' },
    { value: 'hat', label: 'Hat' },
    { value: 'headphones', label: 'Headphones' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bow', label: 'Hair Bow' },
  ],
  expression: [
    { value: 'happy', label: 'Happy' },
    { value: 'cool', label: 'Cool' },
    { value: 'cute', label: 'Cute' },
    { value: 'serious', label: 'Serious' },
    { value: 'surprised', label: 'Surprised' },
    { value: 'wink', label: 'Wink' },
  ],
  extras: [
    { value: 'beard', label: 'Beard' },
    { value: 'freckles', label: 'Freckles' },
    { value: 'cat-ears', label: 'Cat Ears' },
    { value: 'horns', label: 'Horns' },
    { value: 'wings', label: 'Wings' },
    { value: 'blush', label: 'Blush' },
  ],
} as const;

export const DEFAULT_RANDOM_CONFIG: RandomConfig = {
  gender: 'neutral',
  features: [],
  prompt: '',
};
