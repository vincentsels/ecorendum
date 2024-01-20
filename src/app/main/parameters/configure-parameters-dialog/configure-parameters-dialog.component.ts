import { Component } from '@angular/core';
import { DEFAULT_PARAMETERS, ParametersService } from '../parameters.service';

@Component({
  selector: 'app-configure-parameters-dialog',
  templateUrl: './configure-parameters-dialog.component.html',
  styleUrls: ['./configure-parameters-dialog.component.scss']
})
export class ConfigureParametersDialogComponent {
  constructor(public parameterService: ParametersService) {}

  defaultParameters = DEFAULT_PARAMETERS;

  pricePerTonGhgChanged(value: string | number) {
    if (value) {
      this.parameterService.setParameters({
        ...this.parameterService.parameters$.value,
        pricePerTonGhg: Number(value),
      });
    }
  }

  monthlyLegalPenaltyChanged(value: string | number) {
    if (value) {
      this.parameterService.setParameters({
        ...this.parameterService.parameters$.value,
        monthlyLegalPenalty: Number(value),
      });
    }
  }

  resetAll() {
    this.parameterService.setParameters(DEFAULT_PARAMETERS);
  }
}
