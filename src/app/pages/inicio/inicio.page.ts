import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  {

  constructor(private menu: MenuController, private navCtrl: NavController, private authService: AuthService) { }

  rutas: any[] = [
    { title: 'Inicio', link: '/inicio' },
    { title: 'Favoritos', link: '/favorites' }
  ];

  navigateTo(link: string){
    this.navCtrl.navigateForward(link);
  }

  onLogOut(){
    this.authService.logout();

    this.navCtrl.navigateForward('/login');
  }
}
