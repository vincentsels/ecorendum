import { Component, Inject, Injectable, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'common-dialog',
  template: `
  <h1 mat-dialog-title *ngIf="data.title">{{ data.title }}</h1>
  <div mat-dialog-content *ngIf="data.content">
    <div [class]="data.contentClass">{{ data.content }}</div>
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>{{ data.buttonText || ('Ok' | translate) }}</button>
  </div>`,
})
export class CommonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title?: string;
  content?: string;
  contentClass?: string;
  buttonText?: string;
}

@Injectable()
export class CommonDialogService {
  constructor(private dialog: MatDialog, private zone: NgZone) {}

  show(title?: string, content?: string, contentClass?: string, buttonText?: string) {
    this.dialog.open(CommonDialogComponent, {
      data: { title, content, contentClass, buttonText },
    });
  }
}
