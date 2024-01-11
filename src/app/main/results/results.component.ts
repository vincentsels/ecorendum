import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { CommonDialogService } from '../../common/dialog.component';
import { EnumsService } from '../../common/enums.service';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';
import { Results } from './results';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results$: Observable<Results>;

  expandedTotalCost = false;
  expandedTotalImpact = false;

  @Input() dialog = false;

  constructor(service: ResultsService, public enums: EnumsService, private matDialog: MatDialog,
    private commonDialog: CommonDialogService, private translate: TranslateService) {
    this.results$ = service.results$;
  }

  ngOnInit(): void {
    if (this.dialog) {
      this.expandedTotalCost = true;
      this.expandedTotalImpact = true;
    }
  }

  submit() {
    this.matDialog.open(SubmitDialogComponent);
  }

  displayImpact(impactAmount: number) {
    if (impactAmount === 0) return '+-';
    const sign = impactAmount < 0 ? '+' : '- ';
    return sign.repeat(Math.abs(impactAmount));
  }

  toggleTotalCost() {
    this.expandedTotalCost = !this.expandedTotalCost;
  }

  toggleTotalImpact() {
    this.expandedTotalImpact = !this.expandedTotalImpact;
  }

  showCostComparisonDialog() {
    this.commonDialog.show(
      this.translate.instant('Cost comparison'),
      this.translate.instant('costComparisonExplanation'),
    )
  }

  openCopyDialog() {
    this.matDialog.open(ShareDialogComponent);
  }
}
