import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(private navCtrl: NavController) { }

  // Método para manejar el inicio de sesión
  onLogin() {
    if (this.email && this.password) {
      // Lógica de autenticación, aquí puedes integrar un servicio o API de autenticación
      console.log('Logging in with', this.email, this.password);
      // Redirigir a otra página después de un inicio de sesión exitoso
      this.navCtrl.navigateForward('/home');
    } else {
      console.log('Email and password are required');
    }
  }

  // Método para redirigir a la página de registro
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
