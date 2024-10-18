import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
      const response = await axios.post('https://localhost:44315/api/Register', newUser);
      //console.log(response);
      return response.data;
      } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login(userlog: {password: string; username: string}){

    const loginUser = {
      User: userlog.username,
      Password: userlog.password
    };
    try {
      const response = await axios.post('https://localhost:44315/api/Login', loginUser);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  logout(){
    sessionStorage.removeItem('userData');

    sessionStorage.clear();
  }

}
