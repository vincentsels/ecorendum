import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Proposal } from '../proposal';

@Component({
  selector: 'proposal-detail-dialog',
  template: `
<div mat-dialog-content>
  <button mat-icon-button class="close-button" ngClass.gt-xs="gt-xs-close-button" [mat-dialog-close]="true">
    <mat-icon>close</mat-icon>
  </button>
  <app-proposal-detail class="dialog-detail" [dialog]="true" [proposal]="data.proposal"></app-proposal-detail>
</div>
`,
  styles: [
    `
.dialog-detail { max-height: 100% }
.close-button { float: right; }
.gt-xs-close-button { margin-top: -8px; }
`
  ]
})
export class ProposalDetailsDialogComponent {
  constructor(public dialogRef: MatDialogRef<ProposalDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProposalDetailDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface ProposalDetailDialogData {
  proposal: Proposal;
}
