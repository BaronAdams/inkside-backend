import { BlackListedToken }from "../connection"

export const createBlackListedToken = async(token:string) =>{
    try {
        await BlackListedToken.create({token})
    } catch (error) {
        throw Error("Une erreur est survenue lors de la déconnexion de votre token")
    }
}

export const isTokenBlackListed = async(token:string) =>{
    try {
        const result = await BlackListedToken.findOne( { where:{ token } } )
        return !!result
    } catch (error) {
        return null
    }
}