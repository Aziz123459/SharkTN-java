export interface Message {
    id?: number;
    sender: { id: number };
    receiver: { id: number };
    message: string;
    createdAt?: Date;
}
