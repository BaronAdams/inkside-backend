import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "../jwt";
import { getUserById } from "../db/services/user";
import { connect } from "../db/connection";
import { NextFunction } from "./types";

export const authMiddleware = async (request: NextRequest, next: NextFunction) => {
  const requestHeaders = new Headers(request.headers)
  const authorization = requestHeaders.get('authorization')
  const [type, token] = authorization ? authorization.split(" ") : []
  if(type !== "Bearer") return NextResponse.json({ error:true, message:"Vous n'êtes pas autorisés" },{ status:403 })
  if(!token) return NextResponse.json({ error:true, message:"Vous n'avez pas de jéton d'authentification" },{ status:403 })
  const session = await decrypt(token)
  if(!session?.userId) return NextResponse.json({ error:true, message:"Jéton invalide ou expiré" },{ status:400 })
  await connect()
    // @ts-ignore
    const user = await getUserById(session?.userId)
    if(!user) return NextResponse.json({ error:true, message:"Vous n'êtes pas un utilisateur" },{ status:403 })
    const response = NextResponse.next()
    const { password, ...others } = user.dataValues
    // response.headers.set()
    // return response
    request.headers.set("sessionUser",JSON.stringify(others))
    next()
}