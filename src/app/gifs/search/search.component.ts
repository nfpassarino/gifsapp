import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  // se maneja de esta manera para evitar cargar el FormModule completo por un solo input
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  constructor(private gifsService: GifsService) {}
  search() {
    const value = this.txtSearch.nativeElement.value;
    this.gifsService.searchGifs(value);
    this.txtSearch.nativeElement.value = '';
  }
}
