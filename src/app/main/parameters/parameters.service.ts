import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Parameters } from "./parameters";

const LS_KEY_PARAMETERS = 'ecorendum.parameters';

const defaultParameters: Parameters = new Parameters({
  pricePerKtGhg: 100000,
});

@Injectable()
export class ParametersService {
  parameters$: BehaviorSubject<Parameters>;

  constructor() {
    const storedParametersString = localStorage.getItem(LS_KEY_PARAMETERS);

    let parameters: Parameters;
    if (storedParametersString) {
      parameters = new Parameters(JSON.parse(storedParametersString) as Parameters);
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
