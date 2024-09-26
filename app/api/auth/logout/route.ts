import { connect } from "@/lib/db/connection"
import { createBlackListedToken } from "@/lib/db/services/blt"
import { authMiddleware } from "@/lib/middlewares/auth"
import { handler } from "@/lib/middlewares/handler"
import { NextResponse, type NextRequest } from "next/server"

async function getHandler(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    const token = requestHeaders.get('authorization').split(" ")[1]
    try {  
        await connect() 
        await createBlackListedToken(token)
        return NextResponse.json({ success: true, message: "Deconnexion réussie" },{ status:200 })
    } catch(e){
        return NextResponse.json({ error:true, message:"Une erreur est survenue lors de la deconnexion. Veuillez réessayer" },{status: 500})
    }
}

export const GET = handler(authMiddleware, getHandler)
