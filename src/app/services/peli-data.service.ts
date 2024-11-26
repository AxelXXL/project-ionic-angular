import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pelicula } from '../models/pelicula';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PeliDataService {

  private selectedPeliSource = new BehaviorSubject<any>(null);  // Inicializa el valor en null
  selectedPeli$ = this.selectedPeliSource.asObservable(); // Observable para que otros componentes puedan suscribirse
  favoritos: Pelicula[] = [];

  cambiarPeli(peli: Pelicula) {
    this.selectedPeliSource.next(peli);  // Actualiza el valor de la película seleccionada
  }

  async getPelisFav(ID_User: Number | undefined) {
    try {
        const response = await axios.get(`https://localhost:44315/api/GetFavMovies?idUser=${ID_User}`);
        this.favoritos = response.data.Data;
    } catch (error: any) {
      console.error('Error al obtener favoritos:', error);
    }
  }
  
}
