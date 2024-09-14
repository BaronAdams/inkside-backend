import { z } from "zod"

export const loginCredentialsSchema = z.object({ 
    email: z.string({
                invalid_type_error:"L'adresse email doit être une chaîne de caractères", 
                required_error:"L'adresse email est obligatoire"
            }).email({ message:"Le format de l'adresse email est invalide" }), 
    password: z.string({
                invalid_type_error:"Le mot de passe doit être une chaîne de caractères", 
                required_error:"Le mot de passe est obligatoire"
            }).min(6, { message:"Le mot de passe doit avoir au moins 6 caractères" }) 
 })

export const registerCredentialsSchema = z.object({ 
    name: z.string({
        invalid_type_error:"Le nom doit être une chaîne de caractères", 
        required_error:"Le nom est obligatoire"
    }).min(2, { message: "Le nom doit avoir au moins 2 caractères" }),
    username:z.string({
        invalid_type_error:"Le pseudo doit être une chaîne de caractères", 
        required_error:"Le pseudo est obligatoire"
    }).min(3, { message: "Le pseudo doit avoir au moins 3 caractères" }),
    email: z.string({
        invalid_type_error:"L'adresse email doit être une chaîne de caractères", 
        required_error:"L'adresse email est obligatoire"
    }).email({ message: "L'adresse email est invalide"}), 
    password: z.string({
        invalid_type_error:"Le mot de passe doit être une chaîne de caractères", 
        required_error:"Le mot de passe est obligatoire"
    }).min(6, { message: "Le mot de passe doit avoir au moins 6 caractères" }) 
 })