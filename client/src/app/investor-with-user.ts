import { User } from "./user";

export interface InvestorWithUser {
    id?:string 
    businessRegistrationNumber?:string
    investmentAmount?:string
    message?:string
    investorEmail?:string
    user?:User
    createdAt?: string
    updatedAt?: string 

}
