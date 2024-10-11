import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(private navCtrl: NavController) { }

  rutas: any[] = [
    { title: 'Inicio', link: '/inicio' },
    { title: 'Favoritos', link: '/favorites' }
  ];

  navigateTo(link: string){
    this.navCtrl.navigateForward(link);
  }

}
