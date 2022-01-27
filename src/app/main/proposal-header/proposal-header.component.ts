import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EnumsService } from '../../common/enums.service';
import { LanguageService } from '../../common/language.service';
import { Proposal } from '../proposal';
import { ProposalDetailsDialogComponent } from '../proposal-detail/proposal-detail-dialog.component';
import { ProposalDetail } from '../proposal-details';

@Component({
  selector: 'app-proposal-header',
  templateUrl: './proposal-header.component.html',
  styleUrls: ['./proposal-header.component.scss']
})
export class ProposalHeaderComponent {
  @Input() proposal?: Proposal;
  @Input() card: boolean = false;

  @Output('closeDialog') closeDialogEmitter = new EventEmitter();

  constructor(public enums: EnumsService, public dialog: MatDialog, public languageService: LanguageService) {}

  openProposalDetailDialog() {
    if (!this.proposal) return;
    this.dialog.open(ProposalDetailsDialogComponent, {
      data: { proposal: new ProposalDetail(this.proposal) },
      autoFocus: false,
    });
  }

  closeDialog = () => this.closeDialogEmitter.emit();
}
