import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44315/api';

  constructor() { }

  //Metodo para registrar
  async register(user: {username: string; email: string; password: string; idGeneroPeli: number;}) {

      const newUser = {
        UserName: user.username,
        Email: user.email,
        Password: user.password,
        ID_GeneroPeli: user.idGeneroPeli,
      };

      try {
      const response = await axios.post(this.apiUrl, newUser);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
    }

}
