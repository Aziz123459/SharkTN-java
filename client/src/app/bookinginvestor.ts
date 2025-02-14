import { Investor } from "./investor"


export interface Bookinginvestor {
    id?:string
        bookingDate?:string
        investorDTO?:Investor
        createdAt?: string
        updatedAt?: string 
}
