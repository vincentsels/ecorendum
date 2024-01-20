import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ParametersService } from '../parameters.service';

@Component({
  selector: 'app-configure-parameters-dialog',
  templateUrl: './configure-parameters-dialog.component.html',
  styleUrls: ['./configure-parameters-dialog.component.scss']
})
export class ConfigureParametersDialogComponent {
  constructor(public parameterService: ParametersService,
    private dialogRef: MatDialogRef<ConfigureParametersDialogComponent>) {}

    pricePerTonGhg(value: string) {
      if (value) {
        this.parameterService.setParameters({
          ...this.parameterService.parameters$.value,
          pricePerTonGhg: Number(value),
        });
      }
    }
}
