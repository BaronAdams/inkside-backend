import { type NextRequest, NextResponse } from 'next/server'

// 1. Specify allowed origins, protected and public routes
const allowedOrigins = ['http://localhost:3000, http://localhost:3001']
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export default async function middleware(req: NextRequest) {
   // Check the origin from the request
   const origin = req.headers.get('origin') ?? ''
   const isAllowedOrigin = allowedOrigins.includes(origin)
   const searchParams = req.nextUrl.searchParams

   // Handle preflighted requests
  const isPreflight = req.method === 'OPTIONS'
 
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }
 
  // Handle simple requests
  const response = NextResponse.next()
 
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
 
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  console.log("CORS Configured")
  return response

}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)'],
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}