import { Component, inject, OnInit } from '@angular/core';
import { EpisodeService } from './episodes.service.';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { SearchService } from '../search.service,';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episodes.component.html',
})
export class EpisodesComponent {
  private episodeService = inject(EpisodeService);

  constructor(private searchService: SearchService) {}

  episodes$ = this.episodeService.getEpisodes();

  ngOnInit() {
    this.episodes$ = this.searchService.searchTerm$.pipe(
      switchMap((term) =>
        this.episodeService
          .getEpisodes()
          .pipe(
            map((episode) =>
              episode.filter((c) =>
                c.name.toLowerCase().includes(term.toLowerCase())
              )
            )
          )
      )
    );
  }
}
