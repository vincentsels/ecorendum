import { Component } from '@angular/core';
import { Proposal } from './proposal';

import { ProposalService } from './proposal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(public proposalService: ProposalService) {
    this.filteredProjects = proposalService.proposals;
  }

  filteredProjects: Proposal[] = [];
  resultsVisible = false;
  projectsFilter = '';

  setResultsInViewport({ visible }: { visible: boolean }) {
    this.resultsVisible = visible;
  }

  navigateToResults(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  filterChanged() {
    if (this.projectsFilter) {
      this.filteredProjects = this.proposalService.proposals.filter(
        p => p.title.some(t => t.text.includes(this.projectsFilter)) ||
          p.summary.some(t => t.text.includes(this.projectsFilter))
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
