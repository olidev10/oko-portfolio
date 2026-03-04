import { NextResponse } from 'next/server'

const B4A_APP_ID = process.env.B4A_APP_ID
const B4A_REST_KEY = process.env.B4A_REST_KEY
const B4A_SERVER_URL = process.env.B4A_SERVER_URL || 'https://parseapi.back4app.com'

function ensureEnv() {
  if (!B4A_APP_ID || !B4A_REST_KEY) {
    throw new Error('Back4App env variables missing')
  }
}

function b4aHeaders() {
  ensureEnv()
  return {
    'X-Parse-Application-Id': B4A_APP_ID!,
    'X-Parse-REST-API-Key': B4A_REST_KEY!,
    'Content-Type': 'application/json',
  }
}

// PUT /api/projects/[id] => update
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const body = await request.json()
    const res = await fetch(`${B4A_SERVER_URL}/classes/projects/${id}`, {
      method: 'PUT',
      headers: b4aHeaders(),
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to update project', details: data }, { status: 502 })
    }
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
  }
}

// DELETE /api/projects/[id] => delete
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const res = await fetch(`${B4A_SERVER_URL}/classes/projects/${id}`, {
      method: 'DELETE',
      headers: b4aHeaders(),
    })
    if (!res.ok) {
      const t = await res.text()
      return NextResponse.json({ error: 'Failed to delete project', details: t }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
  }
}


