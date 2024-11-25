import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliDataService } from 'src/app/services/peli-data.service';
import { ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
import { LoginModel } from 'src/app/models/login-model';

@Component({
  selector: 'app-info-peli',
  templateUrl: './info-peli.component.html',
  styleUrls: ['./info-peli.component.scss'],
})
export class InfoPeliComponent  implements OnInit {

  storedUserData = sessionStorage.getItem('userData');
  userDataObject: LoginModel | null = null;
  peliSeleccionada: Pelicula | null = null;

  
  constructor(private peliDataService: PeliDataService, private cd: ChangeDetectorRef) { }

  ngOnInit() {

    if (this.storedUserData) {
      this.userDataObject = JSON.parse(this.storedUserData);
    }

    this.peliDataService.selectedPeli$.subscribe(peli => {
      this.peliSeleccionada = peli;
      this.cd.detectChanges();
    });
  }

  async saveFavorites(newPeliFav: Pelicula ){
    try {
      const peliToSend = {
        ...newPeliFav,
        ID_User: this.userDataObject?.ID_User ?? null,
        genre: newPeliFav.genre.join(', ')  // Convierte el array a una cadena separada por comas
      };
  
      const response = await axios.post('https://localhost:44315/api/SaveFavPeli', peliToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.Message);
    }
    catch(error){
      console.log(error);
    }
  }

}
