export type PostsType = {
    id: number
    message: string
    likesCount: string
}
export type ProfileType = {
    userId?: number | null | undefined
    lookingForAJob?: boolean | undefined
    lookingForAJobDescription?: string | undefined
    fullName?: string
    contacts?: ContactsType
    photos?: PhotosType
    aboutMe?: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string
    large: string
}