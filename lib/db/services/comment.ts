import { createCommentDto } from "@/lib/dto/comment.dto"
import { Comment, User } from "../connection"

export const getCommentsByPostId = async (postId:string) => {
    try {
        let comments = await Comment.findAll({
            where:{
                postId
            },
            include:[
                {
                    model: User,
                    as:"author",
                    attributes: ['id','username','profileImg']
                }

            ]
        })
        return comments
    } catch (error) {
        throw new Error("Une erreur est survenue")
    }
}

export const createComment = async (data: createCommentDto)=>{

}
