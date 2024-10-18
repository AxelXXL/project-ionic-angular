import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-list-pelis',
  templateUrl: './list-pelis.component.html',
  styleUrls: ['./list-pelis.component.scss'],
})
export class ListPelisComponent  implements OnInit {

  constructor() { }

  pelisList = [];

  async ngOnInit() {
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
      this.pelisList = response.data;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }

}
