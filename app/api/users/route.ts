import { headers } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest, { params }: { params: { slug: string }}) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const body = await request.formData()
  // query is "hello" for /api/search?query=hello
  const requestHeaders = new Headers(request.headers)
  requestHeaders.get('referer')
  const headersList = headers()
  const referer = headersList.get('referer')
}

export async function POST(request: NextRequest) {
    const res = await request.json()
    return NextResponse.json({ res },{ status:200 })
}