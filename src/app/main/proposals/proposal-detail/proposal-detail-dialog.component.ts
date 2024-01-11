import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Proposal } from '../proposal';
import { ProposalDetail } from '../proposal-details';
import { LanguageService } from '../../../common/language.service';

@Component({
  selector: 'proposal-detail-dialog',
  template: `
<h2 mat-dialog-title>
  <mat-icon class="inline header-icon" fontSet="material-symbols-outlined">{{ data.proposal.icon || 'eco' }}</mat-icon>
  {{ data.proposal | translateProp:'title' | async }}
  <a [routerLink]="'/proposal/' + getSlugInSelectedLanguage()" class="link-button" (click)="closeDialog()"><mat-icon class="inline">link</mat-icon></a>
  <button mat-icon-button class="close-button" [mat-dialog-close]="true">
    <mat-icon>close</mat-icon>
  </button>
</h2>
<div mat-dialog-content class="dialog-content" [style]="getBackgroundImage()">
  <app-proposal-detail class="dialog-detail" [dialog]="true" [proposal]="data.proposal" (closeDialog)="closeDialog()"></app-proposal-detail>
</div>
`,
  styles: [
    `
.dialog-detail { max-height: 100% }

.close-button { float: right; }

.link-button {
  opacity: 0.3;
  margin-left: 6px;

  &:hover {
    opacity: 1;
  }
}

.dialog-content {
  background-size: cover;
  background-position: left, right;
  background-repeat: no-repeat, no-repeat;
}
`
  ]
})
export class ProposalDetailsDialogComponent {
  constructor(private languageService: LanguageService,
    public dialogRef: MatDialogRef<ProposalDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProposalDetailDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog = () => this.dialogRef.close();

  getBackgroundImage() {
    return 'background-image: linear-gradient(145deg, rgba(48, 48, 48, 1) 40%, rgba(48, 48, 48, 0.9) 60%, rgba(48, 48, 48, 0.1) 100%), url(' + this.data.proposal.pictureThumb + ')'
  }

  getSlugInSelectedLanguage() {
    const lang = this.languageService.language.value;
    return lang === 'en' ? this.data.proposal.slugEn
      : lang === 'fr' ? this.data.proposal.slugFr
      : this.data.proposal.slugNl;
  }
}

export interface ProposalDetailDialogData {
  proposal: ProposalDetail;
}
