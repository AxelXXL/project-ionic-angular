import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    username: '',
    email: '',
    password: '',
    idGeneroPeli: 0,
  };

  generos: any[] = []; // Propiedad para almacenar los géneros

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  ngOnInit() {
    this.getGenerosList(); // Llama a la función para cargar los géneros
  }

  async getGenerosList() {
    try {
      const response = await axios.get('https://localhost:44315/api/getGeneros');
      console.log(response);
      this.generos = response.data; // Almacena los géneros en la propiedad
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  onRegister() {
    this.authService.register(this.user)
      .then(response => {
        if (response.Success) {
          alert(response.Message);
          this.navCtrl.navigateRoot('/login');
        } else {
          console.error('Error de registro:', response.Message);
        }
      })
      .catch(error => {
        console.error('Error en el proceso de registro:', error);
      });
  }
}
