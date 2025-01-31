import { Investor } from "./investor";
import { Startup } from "./startup";

export interface Favorite {
    id: string | undefined| null; // Unique identifier for the favorite
    type: 'investor' | 'startup'; // Type of the favorite item
    data: Investor | Startup; // Detailed data of the favorite
}
  