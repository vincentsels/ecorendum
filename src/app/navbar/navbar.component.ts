import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProposalService } from '../main/proposal.service';
import { SelectContextDialogComponent } from './select-context-dialog/select-context-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public proposalService: ProposalService, private matDialog: MatDialog) {}

  changeContext() {
    this.matDialog.open(SelectContextDialogComponent);
  }
}
