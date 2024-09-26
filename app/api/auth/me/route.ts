import { authMiddleware } from "@/lib/middlewares/auth"
import { handler } from "@/lib/middlewares/handler"
import { NextResponse, type NextRequest } from "next/server"

async function getHandler(request: NextRequest){
    const requestHeaders = new Headers(request.headers)
    const sessionUser = JSON.parse(requestHeaders.get('sessionUser'))
    if(sessionUser === null) {
        return NextResponse.json({ error: true, message: "Vous n'êtes pas authentifié" },{ status:401 })
    }else{
        return NextResponse.json({ success: true, user: sessionUser },{ status:200 })
    }
}

export const GET = handler(authMiddleware,getHandler)