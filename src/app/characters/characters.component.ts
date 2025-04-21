import { Component, OnInit } from '@angular/core';
import { CharacterService } from './character.service';
import { SearchService } from '../search.service,';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  imports: [CommonModule],
  styleUrls: ['./characters.component.css'],
  standalone: true,
})
export class CharactersComponent implements OnInit {
  characters$!: Observable<any[]>;

  constructor(
    private characterService: CharacterService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.characters$ = this.searchService.searchTerm$.pipe(
      switchMap((term) =>
        this.characterService
          .getCharacters()
          .pipe(
            map((characters) =>
              characters.filter((c) =>
                c.name.toLowerCase().includes(term.toLowerCase())
              )
            )
          )
      )
    );
  }
}
