import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EpisodeResponse, Episode } from './types';

@Injectable({ providedIn: 'root' })
export class EpisodeService {
  private http = inject(HttpClient);

  getEpisodes(): Observable<Episode[]> {
    return this.http
      .get<EpisodeResponse>('https://rickandmortyapi.com/api/episode')
      .pipe(map((res) => res.results));
  }
}
