import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageService } from './common/language.service';
import { MatSnackbarErrorHandler } from './common/mat-snackbar-error-handler';
import { MaterialModule } from './material.module';
import { UserService } from './user/user.service';
import { LimitLengthPipe } from './common/limit-length.pipe';
import { NavBarProfileMenuComponent } from './navbar/navbar-profile-menu/navbar-profile-menu';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { ProposalComponent } from './main/proposal/proposal.component';
import { ProposalService } from './main/proposal.service';
import { TranslateTextPipe } from './common/translate-text.pipe';
import { TranslateTextAsyncPipe } from './common/translate-text-async.pipe';
import { EnumsService } from './common/enums.service';
import { ResultsComponent } from './main/results/results.component';
import { HelpWidgetComponent } from './common/help-widget.component';

// AoT requires an exported function for factories
// tslint:disable-next-line:function-name
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavBarProfileMenuComponent,
    LimitLengthPipe,
    MainComponent,
    ProposalComponent,
    TranslateTextPipe,
    TranslateTextAsyncPipe,
    ResultsComponent,
    HelpWidgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    LanguageService,
    UserService,
    MatSnackbarErrorHandler,
    ProposalService,
    EnumsService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 10000 } },
    { provide: ErrorHandler, useClass: MatSnackbarErrorHandler, deps: [MatSnackBar, NgZone] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
