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

// GET /api/projects => list
export async function GET() {
  try {
    const res = await fetch(`${B4A_SERVER_URL}/classes/projects`, {
      headers: b4aHeaders(),
      // Next caching can be tuned here if needed
      cache: 'no-store',
    })
    if (!res.ok) {
      const t = await res.text()
      return NextResponse.json({ error: 'Failed to fetch projects', details: t }, { status: 502 })
    }
    const json = await res.json()
    // Parse returns { results: [...] }
    return NextResponse.json(json.results || [])
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
  }
}

// POST /api/projects => create
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const res = await fetch(`${B4A_SERVER_URL}/classes/projects`, {
      method: 'POST',
      headers: b4aHeaders(),
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to create project', details: data }, { status: 502 })
    }
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
  }
}


