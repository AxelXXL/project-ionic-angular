import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliDataService } from 'src/app/services/peli-data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-info-peli',
  templateUrl: './info-peli.component.html',
  styleUrls: ['./info-peli.component.scss'],
})
export class InfoPeliComponent  implements OnInit {

  peliSeleccionada: Pelicula | null = null;
  constructor(private peliDataService: PeliDataService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.peliDataService.selectedPeli$.subscribe(peli => {
      this.peliSeleccionada = peli;
      this.cd.detectChanges();
    });
  }

}
