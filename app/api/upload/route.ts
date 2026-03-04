import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret || !uploadPreset) {
      return NextResponse.json({ error: 'Cloudinary env variables missing' }, { status: 500 })
    }

    // Build signature server-side (signed upload) for security
    const timestamp = Math.floor(Date.now() / 1000)
    const paramsToSign = new URLSearchParams({ timestamp: String(timestamp), upload_preset: uploadPreset })
    const crypto = await import('node:crypto')
    const signature = crypto
      .createHash('sha1')
      .update(`${paramsToSign.toString()}${apiSecret}`)
      .digest('hex')

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

    const uploadForm = new FormData()
    uploadForm.append('file', file)
    uploadForm.append('api_key', apiKey)
    uploadForm.append('timestamp', String(timestamp))
    uploadForm.append('upload_preset', uploadPreset)
    uploadForm.append('signature', signature)

    const res = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: uploadForm,
    })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json({ error: err }, { status: 502 })
      // return NextResponse.json({ error: 'Cloudinary upload failed', details: err }, { status: 502 })
    }

    const data = await res.json()
    return NextResponse.json({ url: data.secure_url, publicId: data.public_id })
  } catch (error: any) {
    return NextResponse.json({ error: 'Unexpected error', details: error?.message }, { status: 500 })
  }
}


