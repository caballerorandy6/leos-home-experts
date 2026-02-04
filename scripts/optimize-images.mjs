import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

async function optimizeImages() {
  console.log('Optimizing images...\n')

  // Logo optimization for mobile (94x48 displayed, 2x for retina = 188x96)
  const logoPath = join(publicDir, 'brand', 'logo-sm.avif')
  const logoMobilePath = join(publicDir, 'brand', 'logo-mobile.avif')

  try {
    const logoInfo = await sharp(logoPath)
      .resize(188, null, { withoutEnlargement: true })
      .avif({ quality: 80 })
      .toFile(logoMobilePath)

    console.log(`✓ Logo mobile: ${logoMobilePath}`)
    console.log(`  Size: ${(logoInfo.size / 1024).toFixed(2)} KB`)
    console.log(`  Dimensions: ${logoInfo.width}x${logoInfo.height}\n`)
  } catch (error) {
    console.error('Error optimizing logo:', error.message)
  }

  // Hero fallback image optimization (reduce quality slightly)
  const heroFallbackPath = join(publicDir, 'carousel', 'patio-build-remodeling-1.avif')
  const heroFallbackOptPath = join(publicDir, 'carousel', 'patio-build-remodeling-1-opt.avif')

  try {
    const heroInfo = await sharp(heroFallbackPath)
      .avif({ quality: 65 })
      .toFile(heroFallbackOptPath)

    console.log(`✓ Hero fallback: ${heroFallbackOptPath}`)
    console.log(`  Size: ${(heroInfo.size / 1024).toFixed(2)} KB`)
    console.log(`  Dimensions: ${heroInfo.width}x${heroInfo.height}\n`)
  } catch (error) {
    console.error('Error optimizing hero fallback:', error.message)
  }

  console.log('Done!')
}

optimizeImages()
