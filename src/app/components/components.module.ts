import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ListPelisComponent } from './list-pelis/list-pelis.component';
import { InfoPeliComponent } from './info-peli/info-peli.component';



@NgModule({
  declarations: [ 
    HeaderComponent,
    ListPelisComponent,
    InfoPeliComponent
  ],
  exports:[
    HeaderComponent,
    ListPelisComponent,
    InfoPeliComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
})
export class ComponentsModule { }
