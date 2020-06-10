import { Injectable, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  // @ViewChild('dialog_template', {static: true }) private dialog_template: TemplateRef<any>;

  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<any>) { }

  open(component, info) {
    console.log("Open dialog Service");
    this.dialogRef = this.dialog.open(component, info);

    // this.dialogRef = this.dialog.open(this.dialog_template, {
    //   width: '85%',
    //   height: '85%'
    // });
  }

  public onSelect(data_emitted_from_dialog: any): void {
    // ...Respond to OK event...
    this.dialogRef.close();
  }

  public closeDialog(): void {
      // ...Respond to Cancel event...
      this.dialogRef.close();
  }
}
