import { connect } from "@/lib/db/connection"
import { createUser, getUserByEmailOrUsername } from "@/lib/db/services/user"
import { RegistrationErrorFields } from "@/lib/definitions"
import { hashPassword } from "@/lib/utils/auth"
import { registerCredentialsSchema } from "@/lib/validators/auth"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    const { name, username, email, password } = await request.json()
    const result = registerCredentialsSchema.safeParse({ name, username, email, password })
    let error: RegistrationErrorFields = {}
    if(result.error){
        for(let iss of result.error.issues){
            error = { ...error, [iss.path[0]]: iss.message }
        }
        return NextResponse.json({ error: true, messages: error }, { status: 400 })
    }
    if(result.success){
        await connect()
        const user = await getUserByEmailOrUsername(result.data.email, result.data.username)
        if(user) return NextResponse.json({ error: true, message:'Un utilisateur existe déja avec ces informations' }, { status: 401 })
        try {
            const hashedPassword = await hashPassword(result.data.password)
            await createUser({ email, password: hashedPassword, name, username })
            return NextResponse.json({ success: true, message:"Un nouvel utilisateur a été crée" }, { status: 201 })
        } catch(e){
            return NextResponse.json({ error: true, message:"Une erreue est survenue. Veuillez réessayer"}, { status: 500 } )
        }
    }
    return NextResponse.json({ error: true, message: "Une erreur est survenue" },{ status:500 })
}