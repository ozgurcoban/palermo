#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeHeroImage() {
  const inputPath = path.join(__dirname, '../public/hero.webp');
  const publicDir = path.join(__dirname, '../public');
  
  console.log('Starting hero image optimization...');
  
  try {
    // Read the original image
    const originalImage = sharp(inputPath);
    const metadata = await originalImage.metadata();
    console.log(`Original image: ${metadata.width}x${metadata.height}, ${metadata.format}`);
    
    // Generate different sizes for responsive loading
    const sizes = [
      { width: 640, suffix: 'sm' },     // Mobile
      { width: 768, suffix: 'md' },     // Tablet
      { width: 1024, suffix: 'lg' },    // Small desktop
      { width: 1280, suffix: 'xl' },    // Regular desktop
      { width: 1920, suffix: '2xl' },   // Large desktop
      { width: 2560, suffix: '3xl' }    // 4K screens
    ];
    
    // Create optimized versions
    for (const size of sizes) {
      const outputPath = path.join(publicDir, `hero-${size.suffix}.webp`);
      
      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'cover'
        })
        .webp({
          quality: size.width <= 768 ? 70 : 75,
          effort: 6
        })
        .toFile(outputPath);
      
      const stats = await fs.stat(outputPath);
      console.log(`Generated ${size.suffix}: ${size.width}px, ${Math.round(stats.size / 1024)}KB`);
    }
    
    // Generate a tiny placeholder for blur effect
    const placeholderPath = path.join(publicDir, 'hero-placeholder.webp');
    await sharp(inputPath)
      .resize(10, 10, { fit: 'cover' })
      .webp({ quality: 20 })
      .toFile(placeholderPath);
    
    // Generate base64 placeholder
    const placeholderBuffer = await sharp(inputPath)
      .resize(10, 10, { fit: 'cover' })
      .webp({ quality: 20 })
      .toBuffer();
    
    const base64 = placeholderBuffer.toString('base64');
    console.log(`\nBase64 placeholder (use this in your component):`);
    console.log(`data:image/webp;base64,${base64}`);
    
    console.log('\nOptimization complete!');
    
  } catch (error) {
    console.error('Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeHeroImage();