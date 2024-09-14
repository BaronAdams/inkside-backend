import bcrypt from 'bcryptjs'

export const isValidPassword = async (rawPassword:string, hash:string)=> {
    return await bcrypt.compare(rawPassword, hash)
}

export const hashPassword = async (password:string)=> {
    const salt = bcrypt.genSaltSync(10)
    return await bcrypt.hash(password, salt)
}