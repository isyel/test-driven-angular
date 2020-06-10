import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getHomes$() {
    return this.httpClient.get<any>('assets/home.json');
  }

  bookHome$() {
    console.log('in bookHome$');

    return this.httpClient.post<any>('http://www.mocky.io/v2/5ed8f601310000f5dec4ea10', {});
  }
}
