import { connect } from "@/lib/db/connection"
import { getUserByEmail } from "@/lib/db/services/user"
import { LoginErrorFields } from "@/lib/definitions"
import { encrypt } from "@/lib/jwt"
import { isValidPassword } from "@/lib/utils/auth"
import { loginCredentialsSchema } from "@/lib/validators/auth"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const { email, password } = await request.json()
    const result = loginCredentialsSchema.safeParse({ email, password })
    let error: LoginErrorFields = {}
    if(result.error){
        for(let iss of result.error.issues){
            error = { ...error, [iss.path[0]]: iss.message }
        }
        return NextResponse.json({ error: true, messages: error }, { status: 400 })
    }
    if(result.success){
        await connect()
        const user = await getUserByEmail(result.data.email)
        if(!user) return NextResponse.json({ error: true, message:'Utilisateur non trouvé' }, { status: 401 })
        try {
            const valid = await isValidPassword(result.data.password, user.password)
            if(!valid) return NextResponse.json({ error: true, message:'Mot de passe incorrect' }, { status: 401 } )
            const token = await encrypt({ userId: String(user.id) })
            if(!token) return NextResponse.json({ error: true, message:'Une erreur est survenue'}, { status: 500 })
            const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60* 1000).toISOString()
            return NextResponse.json({ success: true, accessToken: token, expiresAt }, { status: 201 })
        } catch(e){
            return NextResponse.json({ error: true, message:"Une erreue est survenue. Veuillez réessayer"}, { status: 500 } )
        }
    }
    return NextResponse.json({ error: true, message: "Une erreur est survenue" },{ status:500 })
}