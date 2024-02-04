import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProposalService } from '../main/proposals/proposal.service';
import { SelectContextDialogComponent } from '../main/context/select-context-dialog/select-context-dialog.component';
import { LanguageType } from '../main/proposals/proposal';
import { LanguageService } from '../common/language.service';
import { ContextService } from '../main/context/context.service';

const LS_KEY_LIGHTMODE = 'ecorendum.lightmode';
const STYLE_NAME_LIGHT_MODE = 'light-mode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public proposalService: ProposalService, public contextService: ContextService,
    private matDialog: MatDialog, private languageService: LanguageService) {
    this.language = languageService.language.value;
    this.toggleLightMode(localStorage.getItem(LS_KEY_LIGHTMODE) === 'true');
  }

  version = '0.1';
  lightMode = false;

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

  toggleLightMode(lightMode: boolean) {
    this.lightMode = lightMode;
    if (this.lightMode) {
      document.body.classList.add(STYLE_NAME_LIGHT_MODE);
      localStorage.setItem(LS_KEY_LIGHTMODE, 'true');
    }
    else {
      document.body.classList.remove(STYLE_NAME_LIGHT_MODE);
      localStorage.removeItem(LS_KEY_LIGHTMODE);
    }
  }
}
