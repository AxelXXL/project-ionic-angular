import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliDataService {

  private selectedPeliSource = new BehaviorSubject<any>(null);  // Inicializa el valor en null
  selectedPeli$ = this.selectedPeliSource.asObservable(); // Observable para que otros componentes puedan suscribirse

  cambiarPeli(peli: Pelicula) {
    this.selectedPeliSource.next(peli);  // Actualiza el valor de la película seleccionada
    
  }
}
