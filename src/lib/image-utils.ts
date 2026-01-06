/**
 * Image processing utilities for handling various formats
 * Converts HEIF/HEIC and optimizes images before upload
 */

// Maximum dimensions for uploaded images
const MAX_IMAGE_SIZE = 2048;
const JPEG_QUALITY = 0.85;

/**
 * Check if file is HEIF/HEIC format (common on iOS)
 */
export function isHeifFormat(file: File): boolean {
  const heifTypes = ['image/heif', 'image/heic', 'image/heif-sequence', 'image/heic-sequence'];
  const heifExtensions = ['.heif', '.heic'];

  // Check MIME type
  if (heifTypes.includes(file.type.toLowerCase())) {
    return true;
  }

  // Check file extension (some browsers don't set correct MIME type)
  const fileName = file.name.toLowerCase();
  return heifExtensions.some(ext => fileName.endsWith(ext));
}

/**
 * Convert image file to JPEG using Canvas API
 * Works for most formats including when browser supports HEIF decoding
 */
export async function convertToJpeg(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Calculate new dimensions (maintain aspect ratio)
      let { width, height } = img;
      if (width > MAX_IMAGE_SIZE || height > MAX_IMAGE_SIZE) {
        const ratio = Math.min(MAX_IMAGE_SIZE / width, MAX_IMAGE_SIZE / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      // Draw to canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Fill white background (for transparent images)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Draw image
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to convert image'));
            return;
          }

          // Create new file with .jpg extension
          const baseName = file.name.replace(/\.[^/.]+$/, '');
          const newFile = new File([blob], `${baseName}.jpg`, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });

          resolve(newFile);
        },
        'image/jpeg',
        JPEG_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image. The format may not be supported by your browser.'));
    };

    img.src = url;
  });
}

/**
 * Process image file - converts HEIF and optimizes size
 * Returns processed file ready for upload
 */
export async function processImageFile(file: File): Promise<File> {
  // Check file size (5MB limit)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit');
  }

  // Check if it's an image
  if (!file.type.startsWith('image/') && !isHeifFormat(file)) {
    throw new Error('Please upload an image file');
  }

  // Convert HEIF or large images
  const needsConversion = isHeifFormat(file) ||
    file.size > 1024 * 1024 || // > 1MB
    !['image/jpeg', 'image/png', 'image/webp'].includes(file.type);

  if (needsConversion) {
    try {
      return await convertToJpeg(file);
    } catch (error) {
      // If conversion fails for HEIF, throw helpful error
      if (isHeifFormat(file)) {
        throw new Error('HEIC/HEIF format not supported. Please convert to JPG or PNG first.');
      }
      throw error;
    }
  }

  return file;
}
