import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesComponent } from './homes.component';
import { spyOnClass } from 'jasmine-es6-spies'
import { DataService } from 'src/app/providers/data-service/data.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DialogService } from 'src/app/providers/dialog-service/dialog.service';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesComponent ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
      ],
      providers: [
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
        { provide: DialogService, useFactory: () => spyOnClass(DialogService) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    dialogService = TestBed.get(DialogService);

    const homes = require('../../../../assets/home.json');

    dataService.getHomes$.and.returnValue(of(homes));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show home cards', () => {

    expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(3);

  });

  it('should show home info', () => {

    const home = fixture.nativeElement.querySelector('[data-test="home"]');
    expect(home.querySelector('[data-test="title"]').innerText).toEqual('Home One');
    expect(home.querySelector('[data-test="location"]').innerText).toEqual('new york');
    expect(home.querySelector('[data-test="image"]')).toBeTruthy();

  });

  it('should show book button', () => {

    const home = fixture.nativeElement.querySelector('[data-test="home"]');
    expect(home.querySelector('[data-test="book-button"]')).toBeTruthy();

  });

  it('should use dialog service to open a dialog when clicking on book button', () => {

    //grab the button to click
    const bookButton = fixture.nativeElement.querySelector('[data-test="home"] button');

    //click the button
    bookButton.click();

    //assert that the dialog service was used to open a dialog
    expect(dialogService.open).toHaveBeenCalled();

  });
});
