import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../intefaces/cartelera-response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])


  onScroll(){

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
    const max =  (document.documentElement.scrollHeight || document.body.scrollHeight);

    if ( pos > max) {
      //TODO: Llamar el servicio

      if ( this.peliculasServices.cargando ) { return; }

      this.peliculasServices.getCartelera().subscribe( movies => {
        this.movies.push(...movies);
      });
    }

  }


  constructor( private peliculasServices: PeliculasService) {

   }

  ngOnInit(): void {

    this.peliculasServices.getCartelera().subscribe( movies => {
      //console.log(resp);
      this.movies = movies;
      this.moviesSlideshow = movies;
    });

  }

  ngOnDestroy() {
    this.peliculasServices.resetCarteleraPage();
  }

}
