import { User } from "./user"

export interface StartupWithUser {
    id?:string 
    startupName?:string
    startupLogo?:string
    businessRegistrationNumber?:string
    industry?:string
    briefDescription?:string
    uploadGovernmentIssuedID?:string
    uploadBusinessRegistrationCertificate?:string
    linkedInorSocialMediaProfile?:string
    teamNumber?:Number
    status?:Number
    user?:User
    startupEmail?:string
    createdAt?: string
    updatedAt?: string
}
