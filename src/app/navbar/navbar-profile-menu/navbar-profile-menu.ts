import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { UserService } from '../../user/user.service';
import { LanguageService } from '../../common/language.service';

@Component({
  selector: 'app-navbar-profile-menu',
  templateUrl: './navbar-profile-menu.html',
  styleUrls: ['./navbar-profile-menu.scss'],
})
export class NavBarProfileMenuComponent {
  version = '0.1';

  languages = ['en', 'fr', 'nl'];
  language: string | null = null;
  userName: string | null = null;

  constructor(private userService: UserService, private languageService: LanguageService) {
    this.language = languageService.language.value;
    this.userName = userService.getUserName();
  }

  languageChanged(item: MatSelectChange) {
    const lang = item.value;
    this.language = lang;
    this.languageService.setLanguage(lang);
  }
}
