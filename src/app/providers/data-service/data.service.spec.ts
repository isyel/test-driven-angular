import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DataService', () => {
  let dataService: DataService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    dataService = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should return the list of homes', () => {

    //todo: Spy on and mock the Http client 
    httpClient = TestBed.get(HttpClient);
    const homesMock = [
      {
        title: 'Home One',
        image: 'assets/wrist-watch.jpg',
        location: 'new york'
      },
      {
        title: 'Home two',
        image: 'assets/wrist-watch.jpg',
        location: 'chicago'
      },
      {
        title: 'Home three',
        image: 'assets/wrist-watch.jpg',
        location: 'california'
      }
    ];
    spyOn(httpClient, 'get').and.returnValue(of(homesMock));

    //Use our service to get list of homes
    dataService = TestBed.get(DataService);
    const spy = jasmine.createSpy('spy');
    dataService.getHomes$().subscribe(spy);

    //Verify that the service returned mock data
    expect(spy).toHaveBeenCalledWith(homesMock);

    //verify that the service called the correct endpoint
    expect(httpClient.get).toHaveBeenCalledWith('assets/home.json');
  });
});
