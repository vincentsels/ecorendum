import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Parameters } from "./parameters";

const LS_KEY_PARAMETERS = 'ecorendum.parameters';

const defaultParameters: Parameters = new Parameters(
  100, 12000000
);

@Injectable()
export class ParametersService {
  parameters$: BehaviorSubject<Parameters>;

  constructor() {
    const storedParametersString = localStorage.getItem(LS_KEY_PARAMETERS);

    let parameters: Parameters;
    if (storedParametersString) {
      const storedParameters = JSON.parse(storedParametersString) as Parameters;
      parameters = new Parameters(storedParameters.pricePerTonGhg, storedParameters.annualLegalPenalty);
    } else {
      parameters = defaultParameters;
    }

    this.parameters$ = new BehaviorSubject<Parameters>(parameters);
  }

  public setParameters(parameters: Parameters) {
    this.parameters$.next(parameters);
    localStorage.setItem(LS_KEY_PARAMETERS, JSON.stringify(parameters));
  }
}
