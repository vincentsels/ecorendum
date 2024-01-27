import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProposalDetailComponent } from './main/proposals/proposal-detail/proposal-detail.component';
import { InfoComponent } from './info/info.component';
import { ProposalEditorComponent } from './main/proposals/proposal-editor/proposal-editor.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'info', component: InfoComponent },
  { path: 'p/:key', component: MainComponent },
  { path: 'proposal/:idorslug', component: ProposalDetailComponent },
  { path: 'edit', component: ProposalEditorComponent },
  { path: 'edit/:idorslug', component: ProposalEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
