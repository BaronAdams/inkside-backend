export type createCommentDto = {
    authorId: string,
    content: string,
    Id: string,
    coverPic: string
}

export type updatePostDto = Omit<createCommentDto, 'authorId'>