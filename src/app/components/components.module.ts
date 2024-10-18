import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ListPelisComponent } from './list-pelis/list-pelis.component';



@NgModule({
  declarations: [ 
    HeaderComponent,
    ListPelisComponent
  ],
  exports:[
    HeaderComponent,
    ListPelisComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
})
export class ComponentsModule { }
