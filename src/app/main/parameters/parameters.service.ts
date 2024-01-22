import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Parameters } from "./parameters";

const LS_KEY_PARAMETERS = 'ecorendum.parameters';

export const DEFAULT_PARAM_PRICE_PER_TON_CO2 = 100;
export const DEFAULT_PARAM_EMISSION_GAP_MULIPLIER = 4;
export const DEFAULT_PARAM_MONTHLY_PENALTY = 1000000;

export const DEFAULT_PARAMETERS: Parameters = new Parameters(
  DEFAULT_PARAM_PRICE_PER_TON_CO2,
  DEFAULT_PARAM_EMISSION_GAP_MULIPLIER,
  DEFAULT_PARAM_MONTHLY_PENALTY
);

@Injectable()
export class ParametersService {
  parameters$: BehaviorSubject<Parameters>;

  constructor() {
    const storedParametersString = localStorage.getItem(LS_KEY_PARAMETERS);

    let parameters: Parameters;
    if (storedParametersString) {
      const storedParameters = JSON.parse(storedParametersString) as Parameters;
      parameters = new Parameters(
        storedParameters.pricePerTonGhg || DEFAULT_PARAM_PRICE_PER_TON_CO2,
        storedParameters.emissionGapMultiplier || DEFAULT_PARAM_EMISSION_GAP_MULIPLIER,
        storedParameters.monthlyLegalPenalty || DEFAULT_PARAM_MONTHLY_PENALTY);
    } else {
      parameters = DEFAULT_PARAMETERS;
    }

    this.parameters$ = new BehaviorSubject<Parameters>(parameters);
  }

  public setParameters(parameters: Parameters) {
    this.parameters$.next(parameters);
    localStorage.setItem(LS_KEY_PARAMETERS, JSON.stringify(parameters));
  }
}
