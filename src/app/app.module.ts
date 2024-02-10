import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, NgZone, SecurityContext } from '@angular/core';
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
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { ProposalComponent } from './main/proposals/proposal-card/proposal-card.component';
import { ProposalService } from './main/proposals/proposal.service';
import { TranslateTextPipe } from './common/translate-text.pipe';
import { TranslateTextAsyncPipe } from './common/translate-text-async.pipe';
import { EnumsService } from './common/enums.service';
import { ResultsComponent } from './main/results/results.component';
import { HelpWidgetComponent } from './common/help-widget.component';
import { CommonDialogComponent, CommonDialogService } from './common/dialog.component';
import { ResultsMobileSummaryComponent } from './main/results-mobile-summary/results-mobile-summary.component';
import { InViewportModule } from 'ng-in-viewport';
import { MarkdownModule } from 'ngx-markdown';
import { ResultsDialogComponent } from './main/results/results-dialog.component';
import { CostPipe } from './common/cost.pipe';
import { SubmitDialogComponent } from './main/submit-dialog/submit-dialog.component';
import { CostEstPipe } from './common/cost-est.pipe';
import { ProposalHeaderComponent } from './main/proposals/proposal-header/proposal-header.component';
import { ProposalDetailComponent } from './main/proposals/proposal-detail/proposal-detail.component';
import { ProposalDetailsDialogComponent } from './main/proposals/proposal-detail/proposal-detail-dialog.component';
import { LoremIpsumService } from './common/lorem-ipsum.service';
import { PartyLogoOrNameComponent } from './common/party-logo-or-name.component';
import { ProposalSetComponent } from './main/proposals/proposal-set/proposal-set.component';
import { ShareDialogComponent } from './main/share-dialog/share-dialog.component';
import { ResultProgressComponent } from './main/results/result-progress.component';
import { SelectContextDialogComponent } from './main/context/select-context-dialog/select-context-dialog.component';
import { TranslateEnumPipe } from './common/translate-enum.pipe';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { InfoComponent } from './info/info.component';
import { TranslateProposalProp } from './common/translate-proposal-prop';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { ContextService } from './main/context/context.service';
import { TargetsService } from './main/targets/targets.service';
import { ParametersService } from './main/parameters/parameters.service';
import { ResultsService } from './main/results/results.service';
import { DummyProposalDataGeneratorService } from './main/proposals/dummy-proposal-data-generator.service';
import { ProposalSetSerializerService } from './main/proposals/proposal-set-serializer.service';
import { SelectPartySetDialogComponent } from './main/select-party-set-dialog/select-party-set-dialog.component';
import { ConfigureParametersDialogComponent } from './main/parameters/configure-parameters-dialog/configure-parameters-dialog.component';
import { ImpactScaleComponent } from './common/impact-scale.component';
import { DecimalPipe } from '@angular/common';
import { ProposalEditorComponent } from './main/proposals/proposal-editor/proposal-editor.component';
import { ProposalDataEditorComponent } from './main/proposals/proposal-editor/proposal-data-editor/proposal-data-editor.component';
import { ProposalTranslationsEditorComponent } from './main/proposals/proposal-editor/proposal-translations-editor/proposal-translations-editor.component';
import { ExplainerComponent } from './explainer/explainer.component';
import { InsetLinkComponent } from './explainer/inset-link.component';
import { ExplainerContentEnComponent, ExplainerContentFrComponent, ExplainerContentNlComponent } from './explainer/explainer-content.component';
import { MessageBarComponent } from './message-bar/message-bar.component';
import { CostComponent } from './common/cost.component';
import { CostScaleComponent } from './common/cost-scale.component';
import { CostEditorComponent } from './main/proposals/proposal-editor/proposal-data-editor/cost-editor/cost-editor.component';

// AoT requires an exported function for factories
// tslint:disable-next-line:function-name
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LimitLengthPipe,
    CostPipe,
    MainComponent,
    ProposalComponent,
    ProposalHeaderComponent,
    ProposalDetailComponent,
    ProposalDetailsDialogComponent,
    TranslateTextPipe,
    TranslateTextAsyncPipe,
    TranslateEnumPipe,
    TranslateProposalProp,
    ResultsComponent,
    HelpWidgetComponent,
    CommonDialogComponent,
    ResultsMobileSummaryComponent,
    ResultsDialogComponent,
    SubmitDialogComponent,
    CostEstPipe,
    PartyLogoOrNameComponent,
    ProposalSetComponent,
    ShareDialogComponent,
    ResultProgressComponent,
    SelectContextDialogComponent,
    InfoComponent,
    SelectPartySetDialogComponent,
    ConfigureParametersDialogComponent,
    ImpactScaleComponent,
    CostScaleComponent,
    ProposalEditorComponent,
    ProposalDataEditorComponent,
    ProposalTranslationsEditorComponent,
    ExplainerComponent,
    ExplainerContentNlComponent,
    ExplainerContentEnComponent,
    ExplainerContentFrComponent,
    InsetLinkComponent,
    MessageBarComponent,
    CostComponent,
    CostEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    InViewportModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
      markedExtensions: [gfmHeadingId()],
     }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    DecimalPipe,
    CostPipe,
    LanguageService,
    UserService,
    MatSnackbarErrorHandler,
    ProposalService,
    ResultsService,
    ContextService,
    TargetsService,
    ParametersService,
    EnumsService,
    CommonDialogService,
    LoremIpsumService,
    DummyProposalDataGeneratorService,
    ProposalSetSerializerService,
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 300 } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 10000 } },
    { provide: ErrorHandler, useClass: MatSnackbarErrorHandler, deps: [MatSnackBar, NgZone] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
