const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage(inputPath, outputPath, options = {}) {
  const { width = 1920, quality = 85, format = 'webp' } = options;
  
  try {
    await sharp(inputPath)
      .resize(width, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .toFormat(format, { quality })
      .toFile(outputPath);
    
    const inputStats = await fs.stat(inputPath);
    const outputStats = await fs.stat(outputPath);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`✓ ${path.basename(outputPath)} - ${reduction}% smaller`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function main() {
  // Optimize hero image
  await optimizeImage('public/hero.png', 'public/hero-optimized.webp', {
    width: 1920,
    quality: 85,
    format: 'webp'
  });
  
  // Create mobile version
  await optimizeImage('public/hero.png', 'public/hero-mobile.webp', {
    width: 768,
    quality: 80,
    format: 'webp'
  });
  
  console.log('\nOptimization complete!');
}

main().catch(console.error);