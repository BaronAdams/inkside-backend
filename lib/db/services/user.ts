import User from "../models/user";
// import { registerUserDto, updateUserDto } from "../../../dto/auth.dto";
// import { getAdminByEmail } from "./admin.service";
 
export const getUserById = async (id:string) => await User.findByPk(id)
export const getUserByEmail = async(email:string)=> await User.findOne({
    where:{
        email
    }
})

// export const createUser = async(data: registerUserDto)=> {
//     try {
//         const newUser = await User.create(data)
//         const isAdmin = await getAdminByEmail(data.email)
//         if(isAdmin) {
//             newUser.update({role:'admin'})
//             console.log("New admin confirmed")
//         }
//     } catch (error) {
//         throw new Error("Une erreur est survenue lors de la création d'un utilisateur")
//     }
// }

// export const updateUser = async(id:string, data: updateUserDto)=> {
//     const user = await getUserById(id)
//     if(!user) throw new Error("Le user n'existe pas")
//     user.update({...data})
// }
