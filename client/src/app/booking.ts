import { Startup } from "./startup"

export interface Booking {
    id?:string
    bookingDate?:string
    startupDTO?:Startup
    createdAt?: string
    updatedAt?: string 
}
