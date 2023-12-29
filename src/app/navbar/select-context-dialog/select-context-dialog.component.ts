import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalService } from '../../main/proposal.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-context-dialog',
  templateUrl: './select-context-dialog.component.html',
  styleUrls: ['./select-context-dialog.component.scss']
})
export class SelectContextDialogComponent {
  constructor(public proposalService: ProposalService,
    private dialogRef: MatDialogRef<SelectContextDialogComponent>) {}

  selectWallonia() {
    this.proposalService.setContext('wallonia');
    this.dialogRef.close();
  }

  selectBrussels() {
    this.proposalService.setContext('brussels');
    this.dialogRef.close();
  }

  selectFlanders() {
    this.proposalService.setContext('flanders');
    this.dialogRef.close();
  }
}
