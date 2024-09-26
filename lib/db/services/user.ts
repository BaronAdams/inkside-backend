import { Op } from "sequelize";
import { registerUserDto } from "@/lib/dto/auth.dto";
import { User } from "../connection";
 
export const getUserById = async (id:string) => await User.findByPk(id)
export const getUserByEmail = async(email:string)=> await User.findOne({
    where:{
        email
    }
})
export const getUserByEmailOrUsername = async(email:string, username: string)=> await User.findOne({
    where:{
        [Op.or]:[{email, username}]
    }
})

export const createUser = async(data: registerUserDto)=> {
    try {
        const newUser = await User.create(data)
    } catch (error) {
        throw new Error("Une erreur est survenue lors de la création d'un utilisateur")
    }
}

// export const updateUser = async(id:string, data: updateUserDto)=> {
//     const user = await getUserById(id)
//     if(!user) throw new Error("Le user n'existe pas")
//     user.update({...data})
// }
