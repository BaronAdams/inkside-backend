import { NextRequest } from "next/server"
import { decrypt } from "../jwt"
import { getUserById } from "../db/services/user"
import { connect } from "../db/connection"

export const getSession = async (request: NextRequest)=>{
  const requestHeaders = new Headers(request.headers)
  const authorization = requestHeaders.get('authorization')
  const [type, token] = authorization ? authorization.split(" ") : []
  if(type !== "Bearer") return null
  if(!token) return null
  const session = await decrypt(token)
  if(!session?.userId) return null
  await connect()
  // @ts-ignore
  const user = await getUserById(session?.userId)
  if(!user.id) return null
  const { password, ...others } = user.dataValues
  return others
}