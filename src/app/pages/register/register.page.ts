import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private navCtrl: NavController) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      // Aquí podrías mostrar un mensaje de error o usar un Toast
      return;
    }

    if (this.fullName && this.email && this.password && this.confirmPassword) {
      // Aquí va la lógica de registro, por ejemplo, hacer una llamada a un servicio o API
      console.log('Registering user:', this.fullName, this.email);
      // Luego redirige a la página de inicio u otra página
      this.navCtrl.navigateForward('/home');
    } else {
      console.log('All fields are required');
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
