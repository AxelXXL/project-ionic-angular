import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ApiRestServiceService } from './services/api-rest-service.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public readonly VAPID_PUBLIC_KEY = 'BI5ip35fY-C-pIbAW-gfiDgaoXIPNzIau4RF88eVwsNW6tsX0XUGH4fSNy4GALMaWkGOnI5C2w-4pAcAXHDQkAA';
  
  constructor(private swPush: SwPush, private api: ApiRestServiceService) {
    this.subscribeToNotifications();
  }

  subscribeToNotifications(): any {
    this.swPush
      .requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
      .then((sub) => {
        const token = JSON.parse(JSON.stringify(sub));
        // console.log(token);
        this.api.saveToken(token).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      })
      .catch((err) => {
        console.error('UPS' + err);
      });
  }
}