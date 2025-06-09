import { Ruolo } from "../../enums/Ruolo";


export interface AuthResponse {
  accessToken: string;
  username: string;
  role: Ruolo;
  idUser: number;
}