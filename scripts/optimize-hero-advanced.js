#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeHeroAdvanced() {
  const inputPath = path.join(__dirname, '../public/hero.webp');
  const publicDir = path.join(__dirname, '../public');
  
  console.log('Starting advanced hero image optimization...');
  
  try {
    // Read the original image
    const originalImage = sharp(inputPath);
    const metadata = await originalImage.metadata();
    console.log(`Original image: ${metadata.width}x${metadata.height}`);
    
    // 1. Create a super-optimized main hero image
    const mainHeroPath = path.join(publicDir, 'hero-optimized.webp');
    await sharp(inputPath)
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'cover'
      })
      .webp({
        quality: 82,
        alphaQuality: 100,
        effort: 6,
        smartSubsample: true,
        nearLossless: true
      })
      .toFile(mainHeroPath);
    
    const mainStats = await fs.stat(mainHeroPath);
    console.log(`\nMain hero (1920px): ${Math.round(mainStats.size / 1024)}KB`);
    
    // 2. Create AVIF versions for modern browsers
    console.log('\nGenerating AVIF versions for modern browsers...');
    const avifSizes = [
      { width: 768, suffix: 'sm' },
      { width: 1280, suffix: 'md' },
      { width: 1920, suffix: 'lg' }
    ];
    
    for (const size of avifSizes) {
      const avifPath = path.join(publicDir, `hero-${size.suffix}.avif`);
      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'cover'
        })
        .avif({
          quality: 50,
          effort: 9
        })
        .toFile(avifPath);
      
      const stats = await fs.stat(avifPath);
      console.log(`AVIF ${size.suffix}: ${size.width}px, ${Math.round(stats.size / 1024)}KB`);
    }
    
    // 3. Create a low-quality placeholder (LQIP)
    console.log('\nGenerating LQIP (Low Quality Image Placeholder)...');
    const lqipPath = path.join(publicDir, 'hero-lqip.webp');
    await sharp(inputPath)
      .resize(42, null, { 
        fit: 'cover',
        kernel: 'cubic'
      })
      .webp({ 
        quality: 20,
        smartSubsample: true
      })
      .toFile(lqipPath);
    
    // Generate base64 LQIP
    const lqipBuffer = await sharp(inputPath)
      .resize(20, null, { 
        fit: 'cover',
        kernel: 'cubic'
      })
      .webp({ quality: 20 })
      .toBuffer();
    
    const lqipBase64 = lqipBuffer.toString('base64');
    console.log(`\nLQIP Base64 (20px width):`);
    console.log(`data:image/webp;base64,${lqipBase64}`);
    
    // 4. Generate CSS gradient placeholder based on dominant colors
    const { dominant } = await sharp(inputPath)
      .resize(100, 100)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const pixels = [];
        for (let i = 0; i < data.length; i += 4) {
          pixels.push({
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
            a: data[i + 3]
          });
        }
        
        // Simple dominant color calculation
        const totals = pixels.reduce((acc, pixel) => ({
          r: acc.r + pixel.r,
          g: acc.g + pixel.g,
          b: acc.b + pixel.b
        }), { r: 0, g: 0, b: 0 });
        
        const count = pixels.length;
        return {
          dominant: {
            r: Math.round(totals.r / count),
            g: Math.round(totals.g / count),
            b: Math.round(totals.b / count)
          }
        };
      });
    
    console.log(`\nDominant color: rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`);
    console.log(`CSS gradient placeholder:`);
    console.log(`background: linear-gradient(135deg, rgb(${dominant.r}, ${dominant.g}, ${dominant.b}) 0%, rgb(${Math.round(dominant.r * 0.7)}, ${Math.round(dominant.g * 0.7)}, ${Math.round(dominant.b * 0.7)}) 100%);`);
    
    // 5. Create optimized versions with different aspect ratios for mobile
    console.log('\nGenerating mobile-optimized versions...');
    const mobileHeroPath = path.join(publicDir, 'hero-mobile.webp');
    await sharp(inputPath)
      .resize(768, 1024, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 75,
        effort: 6
      })
      .toFile(mobileHeroPath);
    
    const mobileStats = await fs.stat(mobileHeroPath);
    console.log(`Mobile hero (768x1024): ${Math.round(mobileStats.size / 1024)}KB`);
    
    console.log('\nOptimization complete!');
    console.log('\nRecommended implementation:');
    console.log('1. Use AVIF with WebP fallback for modern browsers');
    console.log('2. Use the LQIP base64 as placeholder');
    console.log('3. Consider using the mobile version for portrait viewports');
    console.log('4. Implement progressive enhancement with intersection observer');
    
  } catch (error) {
    console.error('Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeHeroAdvanced();