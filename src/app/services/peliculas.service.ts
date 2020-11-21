import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../intefaces/cartelera-response';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor( private http: HttpClient) { }


  getCartelera(): Observable<CarteleraResponse> {

    return this.http.get<CarteleraResponse>('https://api.themoviedb.org/3/movie/now_playing?api_key=b25222e4f1690e2f2451b59e41aafee1&language=es-ES&page=1');

  }

}
