import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../search.service,';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Output() searchTerm = new EventEmitter<string>();

  constructor(private searchService: SearchService) {}

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const term = inputElement.value;
    this.searchService.updateSearchTerm(term);
  }
}
