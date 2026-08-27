import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'file:///C:/Users/ahmad/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs'

const jobs = [
  ['echovision-dubai-network-hero.png', 'hero-dubai', [1600, 960]],
  ['dolphin-3d-mascot.png', 'dolphin', [1200, 700]],
  ['dolphin-wireframe.png', 'dolphin-wireframe', [1000, 620]],
  ['al-qaseem.png', 'al-qaseem', [1200, 720]],
  ['lebanese-palace.png', 'lebanese-palace', [1200, 720]],
]
const input = new URL('../src/assets/', import.meta.url)
const output = new URL('../src/assets/optimized/', import.meta.url)
const publicOutput = new URL('../public/', import.meta.url)
await mkdir(output, { recursive: true })
await mkdir(publicOutput, { recursive: true })

for (const [source, name, widths] of jobs) {
  for (const width of widths) {
    await sharp(fileURLToPath(new URL(source, input))).resize({ width, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(fileURLToPath(new URL(`${name}-${width}.webp`, output)))
  }
}

// The supplied wireframe dolphin has a black studio backdrop. Preserve its cyan
// network and glow while making only the near-black backdrop transparent for web use.
for (const width of [1000, 620]) {
  const { data, info } = await sharp(fileURLToPath(new URL('dolphin-wireframe.png', input))).resize({ width, withoutEnlargement: true }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let index = 0; index < data.length; index += info.channels) {
    const luminance = data[index] * .2126 + data[index + 1] * .7152 + data[index + 2] * .0722
    data[index + 3] = Math.round(Math.max(0, Math.min(255, (luminance - 9) * 4.8)))
  }
  await sharp(data, { raw: info }).webp({ quality: 85, alphaQuality: 90, effort: 6 }).toFile(fileURLToPath(new URL(`dolphin-wireframe-transparent-${width}.webp`, output)))
}

await sharp(fileURLToPath(new URL('echovision-dubai-network-hero.png', input))).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, progressive: true }).toFile(fileURLToPath(new URL('../public/echovision-og.jpg', import.meta.url)))
console.log('Generated responsive WebP assets and public/echovision-og.jpg')
