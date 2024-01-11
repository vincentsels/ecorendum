import { ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainMap } from '../proposal';

export class Parameters {
  constructor(props: Partial<Parameters> = {}) {
    Object.assign(this, props);
  }

  pricePerKtGhg = 100000;
}
