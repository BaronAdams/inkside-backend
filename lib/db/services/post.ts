import { createPostDto, updatePostDto } from "@/lib/dto/post.dto";
import { Post } from "../connection";

 
export const getPostById = async (id:string) => {
    try {
        let post = await Post.findByPk(id)
        return post
    } catch (error) {
        throw new Error("Une erreur est survenue")
    }
}

export const getAllPosts = async () => {
    try {
        let posts = await Post.findAll()
        return posts
    } catch (error) {
        throw new Error("Une erreur est survenue")
    }
}

export const createPost = async(data: createPostDto)=>{
    try {
        await Post.create(data)
    } catch (error) {
        throw new Error("Une erreur est survenue lors de la création du post")
    } 
}

export const deletePost = async(id: string)=> {
    try {
        await Post.destroy({ where: { id } })
    } catch (error) {
        throw new Error("Une erreur est survenue lors de la suppression du post")
    }
}

export const updatePost = async(id:string, data: updatePostDto)=> {
    const post = await getPostById(id)
    if(!post) throw new Error("Le post n'existe pas")
    post.update({...data})
}