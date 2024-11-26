import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from 'src/app/models/login-model';
import { Pelicula } from 'src/app/models/pelicula';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { PeliDataService } from 'src/app/services/peli-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  storedUserData = sessionStorage.getItem('userData');
  userDataObject: LoginModel | null = null;
  pelisList: Pelicula[] = [];
  limit = 20;  // Número de elementos a cargar por vez
  offset = 0;  // Controla el desplazamiento (inicio de la siguiente carga)
  hasMoreData = true;  // Verifica si aún hay más datos para cargar
  idUser: Number | undefined;

  constructor(private peliDataService: PeliDataService, private menu: MenuController, private navCtrl: NavController, private authService: AuthService) { }

  async ngOnInit() {
    if (this.storedUserData) {
      this.userDataObject = JSON.parse(this.storedUserData);
    }
    this.idUser = this.userDataObject?.ID_User;
    await this.peliDataService.getPelisFav(this.idUser);
    this.pelisList = this.peliDataService.favoritos;
  }

  async onIonInfinite(ev: InfiniteScrollCustomEvent) {
    // Solo cargar más datos si hay más para cargar
    if (this.hasMoreData) {
      await this.peliDataService.getPelisFav(this.idUser);
    }

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 700);
  }

  seleccionarPeli(peli: Pelicula) {
    this.peliDataService.cambiarPeli(peli);
    this.navCtrl.navigateForward('/inicio');
  }

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
