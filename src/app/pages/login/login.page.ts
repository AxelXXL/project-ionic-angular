import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  user = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private navCtrl: NavController) { }

  // Método para manejar el inicio de sesión
  onLogin() {
    this.authService.login(this.user)
      .then(response => {
        if(response.Success) {
          alert(response.Message + " Se redirijira a la pagina de inicio");
          setTimeout(() => {
            this.navCtrl.navigateRoot('/inicio')
          }, 1500);
        }
      })
      .catch(error => {
        console.error('Error en el proceso de login:', error);
      });
  }

  // Método para redirigir a la página de registro
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }
}
