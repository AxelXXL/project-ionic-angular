import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { LoginModel } from 'src/app/models/login-model';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliDataService } from 'src/app/services/peli-data.service';

@Component({
  selector: 'app-list-pelis',
  templateUrl: './list-pelis.component.html',
  styleUrls: ['./list-pelis.component.scss'],
})

export class ListPelisComponent implements OnInit {

  constructor(private peliDataService: PeliDataService){}

  storedUserData = sessionStorage.getItem('userData');
  userDataObject: LoginModel | null = null; // Permitir que sea null si no existe

  pelisList: Pelicula[] = [];
  limit = 20;  // Número de elementos a cargar por vez
  offset = 0;  // Controla el desplazamiento (inicio de la siguiente carga)
  hasMoreData = true;  // Verifica si aún hay más datos para cargar

  async ngOnInit() {
    // Verificar si storedUserData tiene un valor antes de usar JSON.parse
    if (this.storedUserData) {
      this.userDataObject = JSON.parse(this.storedUserData);
    } else {
      console.warn('No hay datos de usuario almacenados en sessionStorage.');
    }

    await this.getPelisList();
  }

  private async getPelisList() {
    const options = {
      method: 'GET',
      url: 'https://imdb-top-100-movies.p.rapidapi.com/',
      headers: {
        'x-rapidapi-key': '32b50a9f4dmsh59022422fe7b514p1f35b1jsn08ce94ba2bb5',
        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      // Slice para controlar el número de elementos cargados
      const newPelis = response.data.slice(this.offset, this.offset + this.limit);
  
      // Filtrar las películas según el género del usuario
      const peliculasFiltradas = newPelis.filter((peli: Pelicula) => {
        // Verifica si el género de la película incluye el género del usuario
        return peli.genre.includes(this.userDataObject?.GeneroPeli ?? '');
      });
  //console.log(this.userDataObject?.GeneroPeli);
      // Verifica si quedan más datos por cargar
      if (peliculasFiltradas.length === 0) {
        //console.log('No se encontraron más películas del género:', this.userDataObject?.GeneroPeli);
        this.hasMoreData = false; // No hay más datos
      } else {
        this.pelisList = [...this.pelisList, ...peliculasFiltradas]; // Agrega a la lista existente
        this.offset += this.limit; // Aumenta el offset para la siguiente carga
        //console.log('Películas filtradas:', peliculasFiltradas);
      }
    } catch (error) {
      console.error('Error al obtener la lista de películas:', error);
    }
  }
  

  async onIonInfinite(ev: InfiniteScrollCustomEvent) {
    // Solo cargar más datos si hay más para cargar
    if (this.hasMoreData) {
      await this.getPelisList();
    }

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 700);
  }


  seleccionarPeli(peli: Pelicula) {
    this.peliDataService.cambiarPeli(peli); // Enviar la película seleccionada al servicio
  }

}
