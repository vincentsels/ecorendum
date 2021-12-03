import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Proposal } from './proposal';

import { ProposalService } from './proposal.service';
import { ResultsDialogComponent } from './results/results-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(public proposalService: ProposalService, private dialog: MatDialog) {
    this.filteredProjects = proposalService.proposals;
  }

  filteredProjects: Proposal[] = [];
  projectsFilter = '';

  showResults() {
    this.dialog.open(ResultsDialogComponent, {
      autoFocus: false,
    });
  }

  filterChanged() {
    if (this.projectsFilter) {
      this.filteredProjects = this.proposalService.proposals.filter(
        p => p.title.some(t => t.text.toLocaleLowerCase().includes(this.projectsFilter.toLocaleLowerCase())) ||
          p.summary.some(t => t.text.toLocaleLowerCase().includes(this.projectsFilter.toLocaleLowerCase()))
      );
    } else {
      this.filteredProjects = this.proposalService.proposals;
    }
  }

  clearFilter() {
    this.projectsFilter = '';
    this.filterChanged();
  }
}
