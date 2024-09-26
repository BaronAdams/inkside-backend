export type createPostDto = {
    title: string,
    content: string,
    adminId: string,
    coverPic: string
}

export type updatePostDto = Omit<createPostDto, 'adminId'>