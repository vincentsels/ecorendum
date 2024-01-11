import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContextService } from '../context.service';

@Component({
  selector: 'app-select-context-dialog',
  templateUrl: './select-context-dialog.component.html',
  styleUrls: ['./select-context-dialog.component.scss']
})
export class SelectContextDialogComponent {
  constructor(public contextService: ContextService,
    private dialogRef: MatDialogRef<SelectContextDialogComponent>) {}

  selectWallonia() {
    this.contextService.setContext('wallonia');
    this.dialogRef.close();
  }

  selectBrussels() {
    this.contextService.setContext('brussels');
    this.dialogRef.close();
  }

  selectFlanders() {
    this.contextService.setContext('flanders');
    this.dialogRef.close();
  }
}
