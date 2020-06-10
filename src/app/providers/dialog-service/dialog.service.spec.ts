import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

describe('DialogService', () => {
  let dialogService: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }, 
        //{
        //   provide: MAT_DIALOG_DATA,
        //   useValue: {} // Add any data you wish to test if it is passed/used correctly
        // },
        {
          provide: MatDialog,
          useValue: {}
        },
        // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
      ]
    });
    dialogService = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(dialogService).toBeTruthy();
  });
});
