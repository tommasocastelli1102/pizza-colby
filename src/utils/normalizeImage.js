// Re-encodes an uploaded image to JPEG via canvas before it's previewed or
// sent anywhere. This matters because iPhones save photos as HEIC by
// default: Safari can decode HEIC fine (so a preview looks correct to the
// person uploading), but Chrome/Firefox/most email clients can't — so the
// same file shows as broken everywhere else (the admin page, the
// notification email). Re-encoding through <img>/canvas uses Safari's own
// native HEIC decoder when that's the source format, so the file leaving
// the browser is always a universally-viewable JPEG regardless of what the
// camera produced. Downsizing large camera photos here also meaningfully
// cuts upload time on mobile networks.

// Thrown only when THIS browser fundamentally can't decode the file at all
// (e.g. real HEIC in Chrome/Firefox, or a corrupted file). That file would
// also fail to render everywhere else it's later viewed, so callers should
// reject it rather than silently accepting a preview that's already broken.
export class ImageDecodeError extends Error {}

export async function normalizeImage(file, { maxDimension = 1600, quality = 0.85 } = {}) {
  if (!file || !file.type?.startsWith('image/')) return file

  const objectUrl = URL.createObjectURL(file)

  let img
  try {
    img = new Image()
    img.src = objectUrl
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = () => reject(new ImageDecodeError('This browser could not open this image.'))
    })
  } catch (err) {
    URL.revokeObjectURL(objectUrl)
    throw err
  }

  try {
    const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
    const width = Math.round(img.width * scale) || img.width
    const height = Math.round(img.height * scale) || img.height

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d').drawImage(img, 0, 0, width, height)

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('canvas.toBlob failed'))),
        'image/jpeg',
        quality
      )
    })

    const baseName = (file.name || 'photo').replace(/\.[^/.]+$/, '')
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' })
  } catch (err) {
    // The image DID decode successfully here, so the original file is still
    // safe to fall back to — only the resize/re-encode step failed.
    console.warn('Image re-encoding failed, using the original file instead:', err)
    return file
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}
