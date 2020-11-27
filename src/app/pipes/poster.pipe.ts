import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform(poster: string): string {

    //https://image.tmdb.org/t/p/w500{{ movie.poster_path }}

    if ( poster || poster === null  ) {
      return `https://image.tmdb.org/t/p/w500${ poster }`;
    } else {
      return './assets/no-image.jpg';
    }

    console.log(poster);
    return poster;
  }

}
