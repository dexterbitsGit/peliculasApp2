import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../intefaces/cartelera-response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public movies: Movie[] = [];

  constructor( private peliculasServices: PeliculasService) {

   }

  ngOnInit(): void {

    this.peliculasServices.getCartelera().subscribe( resp => {
      //console.log(resp);
      this.movies = resp.results;
    });

  }

}
