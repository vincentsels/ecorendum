import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { CommonDialogService } from '../../common/dialog.component';
import { Results } from '../results/results';
import { ResultsService } from '../results/results.service';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss']
})
export class SubmitDialogComponent {
  result: Results;
  legalTargetMet: boolean;
  ghgTargetMet: boolean;
  eeTargetMet: boolean;
  reTargetMet: boolean;
  allTargetsMet: boolean;

  agree = false;

  constructor(public dialogRef: MatDialogRef<SubmitDialogComponent>, resultsService: ResultsService,
    private snackBar: MatSnackBar, private translate: TranslateService, private commonDialog: CommonDialogService) {
    this.result = resultsService.results$.getValue();
    this.ghgTargetMet = this.result.euGhgTarget.percentage >= 100;
    this.eeTargetMet = this.result.euEeTarget.percentage >= 100;
    this.reTargetMet = this.result.euReTarget.percentage >= 100;
    this.legalTargetMet = this.result.legalGhgTarget.percentage >= 100;
    this.allTargetsMet = this.legalTargetMet && this.ghgTargetMet && this.eeTargetMet && this.reTargetMet;
  }

  ok() {
    this.snackBar.open(this.translate.instant(
      'This would submit your preferred measures so the government gets an idea of the support for each of them.'), 'OK');
    this.dialogRef.close();
  }

  showCostComparisonDialog() {
    this.commonDialog.show(
      this.translate.instant('Cost comparison'),
      this.translate.instant('costComparisonExplanation'),
    )
  }
}
