import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Data, SearchGifsResponse } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'ZLcTnTVk0tY41lNkMfCPttP8IBbcDvv6';
  private _queries: string[] = [];

  public results: Data[] = [];

  get queries() {
    return [...this._queries];
  }

  constructor(private http: HttpClient) {
    this._queries = JSON.parse(localStorage.getItem('queries') || '[]');
    this.results = JSON.parse(localStorage.getItem('results') || '[]');
  }

  searchGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (query.length === 0) return;
    if (!this._queries.includes(query)) {
      this._queries.unshift(query);
      this._queries = this._queries.splice(0, 10);
      localStorage.setItem('queries', JSON.stringify(this._queries));
    }
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10');
    this.http
      .get<SearchGifsResponse>(`${this.urlService}/search`, { params })
      .subscribe((res: SearchGifsResponse) => {
        this.results = res.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
