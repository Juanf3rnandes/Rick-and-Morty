import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterResponse, Character } from './types';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private http = inject(HttpClient);

  getCharacters(): Observable<Character[]> {
    return this.http
      .get<CharacterResponse>('https://rickandmortyapi.com/api/character')
      .pipe(map((res) => res.results));
  }
}
