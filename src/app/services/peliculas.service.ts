import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../intefaces/cartelera-response';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

private baseUrl: string = 'https://api.themoviedb.org/3';
private carteleraPage = 1;
public cargando: boolean = false;

  constructor( private http: HttpClient) { }

  get params() {
    return {
      api_key: 'b25222e4f1690e2f2451b59e41aafee1',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if ( this.cargando) {
      // cargando peliculas
      return of([]);
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${ this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
     map( (resp => resp.results ) ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      } )
    );

  }

  buscarPeliculas( texto: string ): Observable<Movie[]> {

    const params = {...this.params, page: '1', query: texto};

    //https://api.themoviedb.org/3/search/movie

     return this.http.get<CarteleraResponse>(` ${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    )
    
  }

}
