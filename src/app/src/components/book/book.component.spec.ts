import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/providers/data-service/data.service';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData;
  const el = (selector) => fixture.nativeElement.querySelector(selector);
  let dataService: jasmine.SpyObj<DataService>;
  let dialogRefService: jasmine.SpyObj<MatDialogRef<BookComponent>>;
  let notificationService: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
        { provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef) },
        { provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar) },
        { 
          provide: MAT_DIALOG_DATA,
          useValue: {} // Add any data you wish to test if it is passed/used correctly
        },
        {
          provide: MatDialog,
          useValue: {}
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    dialogData = TestBed.get(MAT_DIALOG_DATA);
    dataService = TestBed.get(DataService);
    dialogRefService = TestBed.get(MatDialogRef);
    notificationService = TestBed.get(MatSnackBar);
    
    const homes = require('../../../../assets/home.json');
    dialogData.home = homes[0];
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //It should Display title
  it('should show title', () => {
    expect(el('[data-test="title"]').textContent).toContain('Book Home One');
  });

  //It should show price
  it('should show price', () => {
    expect(el('[data-test="price"]').textContent).toContain('$200 per night');
  });

  //It should show checkin date field
  it('should show checkin date field', () => {
    expect(el('[data-test="check-in"]')).toBeTruthy();
  });

  //It should show checkout date field
  it('should show checkout date field', () => {
    expect(el('[data-test="check-out"]')).toBeTruthy();
  });

  //It should show total
  it('should show total', () => {
    //user enters checkin date
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = "22/9/20";
    checkIn.dispatchEvent(new Event('input'));

    //user enters checkout date
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = "25/9/20";
    checkOut.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();

    //assert that the total shows 3 x 200
    expect(el('[data-test="total"]').textContent).toContain('Total: $600');

  });

  //It should show book home after clicking the book button
  it('should book home after clicking the book button', () => {
    dataService.bookHome$.and.returnValue(of(null));

    //user enters checkin date
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = "22/9/20";
    checkIn.dispatchEvent(new Event('input'));

    //user enters checkout date
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = "25/9/20";
    checkOut.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();

    //user click on the click button
    el('[data-test="book-button"] button').click();

    //assert that the data service was used to book the home
    expect(dataService.bookHome$).toHaveBeenCalled();

  });

  it('should close the dialog and show notification after clicking book button', () => {
    dataService.bookHome$.and.returnValue(of(null));

    //user enters checkin date
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = "22/9/20";
    checkIn.dispatchEvent(new Event('input'));

    //user enters checkout date
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = "25/9/20";
    checkOut.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();

    //user click on the click button
    el('[data-test="book-button"] button').click();

    //assert that the data service was used to book the home
    expect(dialogRefService.close).toHaveBeenCalled();

    expect(notificationService.open).toHaveBeenCalled();

  });
});
