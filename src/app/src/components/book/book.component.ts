import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { DataService } from 'src/app/providers/data-service/data.service';
import { DialogService } from 'src/app/providers/dialog-service/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  checkIn
  checkOut

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService,
    private dialogService: DialogService, private dialogRef: MatDialogRef<any>,
    private _snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  calculateTotal(checkIn, checkOut) {
    //find the diff between dates to get number of nights
    const checkInDate = moment(checkIn, 'DD-MM-YY');
    const checkOutDate = moment(checkOut, 'DD-MM-YY');
    const nights = checkOutDate.diff(checkInDate, 'days');

    return Number.isNaN(nights) ? 0 : nights * this.data.home.price;

    //multiply number of nights by price
  }

  bookHome() {
    this.dataService.bookHome$().subscribe((result) => {
      console.log(result);
      this.dialogRef.close();
      this._snackBar.open("Successfully Booked", "close", {
        duration: 2000,
      });
   
    });
  }

}
