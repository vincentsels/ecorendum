import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { Proposal } from './proposal';
import { ProposalService } from './proposal.service';
import { ResultsDialogComponent } from './results/results-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  allProjects$ = new BehaviorSubject<Proposal[]>([]);
  filteredProjects$ = new BehaviorSubject<Proposal[]>([]);
  projectsFilter = '';
  projectsFilter$ = new Subject<string>();

  subscriptions = new Subscription();

  constructor(public proposalService: ProposalService, private dialog: MatDialog, private translate: TranslateService) {
    this.allProjects$ = proposalService.proposals$;
    this.filteredProjects$.next(this.allProjects$.value);
    this.proposalService.updateResults();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.projectsFilter$
        .pipe(
          withLatestFrom(this.allProjects$),
          map(([filter, proposals]) => {
            if (!filter) return proposals;
            return proposals.filter(
              p => p.title.some(t => t.text.toLocaleLowerCase().includes(this.projectsFilter.toLocaleLowerCase())) ||
                p.summary.some(t => t.text.toLocaleLowerCase().includes(this.projectsFilter.toLocaleLowerCase()))
            );
          })
        )
        .subscribe((proposals) => this.filteredProjects$.next(proposals))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showResults() {
    this.dialog.open(ResultsDialogComponent, {
      autoFocus: false,
    });
  }

  filterChanged() {
    this.projectsFilter$.next(this.projectsFilter);
  }

  clearFilter() {
    this.projectsFilter = '';
    this.filterChanged();
  }

  clearSelection() {
    if (confirm(this.translate.instant('Are you sure you want to erase your selection of measures?'))) {
      this.proposalService.clearSelection();
    }
  }
}
