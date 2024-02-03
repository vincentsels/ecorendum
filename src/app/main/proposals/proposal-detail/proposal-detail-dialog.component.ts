import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
<div mat-dialog-content class="dialog-content" [style]="'background-image: url(' + data.proposal.pictureThumb + ')'">
  <div class="dialog-content-overlay">
    <app-proposal-detail class="dialog-detail" [dialog]="true" [proposal]="data.proposal" (closeDialog)="closeDialog()"></app-proposal-detail>
  </div>
</div>
`,
  styleUrl: './proposal-detail-dialog.component.scss'
})
export class ProposalDetailsDialogComponent {
  constructor(private languageService: LanguageService,
    public dialogRef: MatDialogRef<ProposalDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProposalDetailDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog = () => this.dialogRef.close();

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
