import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProposalService } from '../main/proposal.service';
import { SelectContextDialogComponent } from './select-context-dialog/select-context-dialog.component';
import { LanguageType } from '../main/proposal';
import { LanguageService } from '../common/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public proposalService: ProposalService, private matDialog: MatDialog, private languageService: LanguageService) {
    this.language = languageService.language.value;
  }

  version = '0.1';

  languages = ['en', 'fr', 'nl'];
  language: string | null = null;
  userName: string | null = null;

  languageChanged(lang: LanguageType) {
    this.language = lang;
    this.languageService.setLanguage(lang);
  }

  toUpper = (lang: string | null) => lang ? lang.toUpperCase(): '';

  changeContext() {
    this.matDialog.open(SelectContextDialogComponent);
  }
}
