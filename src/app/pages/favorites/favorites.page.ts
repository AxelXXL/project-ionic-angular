import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage{

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
