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

  constructor(private peliDataService: PeliDataService, private menu: MenuController, private navCtrl: NavController, private authService: AuthService) { }

  async ngOnInit() {
    if (this.storedUserData) {
      this.userDataObject = JSON.parse(this.storedUserData);
    }

    await this.getPelisFav();
  }

  public async getPelisFav() {

    const idUser = this.userDataObject?.ID_User;
    const options = {
      method: 'GET',
      url: `https://localhost:44315/api/GetFavMovies?idUser=${idUser}`,
    };

    try {
      const response = await axios.request(options);
      
      const favPelis = response.data.Data.slice(this.offset, this.offset + this.limit);

      if (favPelis.length === 0) {
        //console.log('No se encontraron más películas del género:', this.userDataObject?.GeneroPeli);
        this.hasMoreData = false; // No hay más datos
      } else {
        this.pelisList = [...favPelis]; // Agrega a la lista existente
        this.offset += this.limit; // Aumenta el offset para la siguiente carga
      }

    } catch (error) {
      console.error('Error al obtener la lista de películas:', error);
    }
  }

  async onIonInfinite(ev: InfiniteScrollCustomEvent) {
    // Solo cargar más datos si hay más para cargar
    if (this.hasMoreData) {
      await this.getPelisFav();
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
