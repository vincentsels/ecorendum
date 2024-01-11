import { ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainMap } from '../proposals/proposal';

export class Parameters {
  constructor(props: Partial<Parameters> = {}) {
    Object.assign(this, props);
  }

  pricePerKtGhg = 100000;
}
