import { Ruolo } from "../enums/Ruolo";

export interface Utente {
  id?: number;
  password?: string;
  username: string;
  ruolo: Ruolo;
}
