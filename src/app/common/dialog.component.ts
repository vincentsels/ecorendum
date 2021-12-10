import { Component, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'common-dialog',
  template: `
  <button mat-icon-button class="close-button" [mat-dialog-close]="true">
    <mat-icon>close</mat-icon>
  </button>
  <h1 mat-dialog-title *ngIf="data.title">
    {{ data.title }}
  </h1>
  <div mat-dialog-content>
    <div [class]="data.contentClass" *ngIf="data.content">{{ data.content }}</div>
    <markdown *ngIf="data.contentMdSrc" [src]="data.contentMdSrc"></markdown>
    <markdown *ngIf="data.contentMdData" [data]="data.contentMdData">{{ data.content }}</markdown>
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>{{ data.buttonText || ('Ok' | translate) }}</button>
  </div>`,
  styles: [
    `.close-button { float: right; }`
  ]
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

  contentMdSrc?: string;
  contentMdData?: string;

  buttonText?: string;
}

@Injectable()
export class CommonDialogService {
  constructor(private dialog: MatDialog) {}

  show(title?: string, content?: string, contentClass?: string, contentMdSrc?: string, contentMdData?: string, buttonText?: string) {
    this.dialog.open(CommonDialogComponent, {
      data: { title, content, contentClass, contentMdSrc, contentMdData, buttonText },
      autoFocus: false,
    });
  }
}
