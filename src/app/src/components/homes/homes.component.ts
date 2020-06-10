import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/providers/data-service/data.service';
import { DialogService } from 'src/app/providers/dialog-service/dialog.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {
  homes$;

  constructor(private dataService: DataService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.homes$ = this.dataService.getHomes$();
  }

  openDialog(home) {
    this.dialogService.open(BookComponent, {
      width: '300px', 
      data: { home }
    });
  }

  

}
