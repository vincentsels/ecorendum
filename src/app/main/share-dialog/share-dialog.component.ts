import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalService } from '../proposals/proposal.service';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent {
  constructor(private proposalService: ProposalService) {}

  url = window.location.origin + '/p/' + this.proposalService.selectionKey;
  result: string = '';
  success = false;

  onClipboardCopy(successful: boolean) {
    this.success = successful;
  }
}
