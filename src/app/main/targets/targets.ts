import { ImpactAmount, ImpactAmountMap, ImpactDomain, ImpactDomainMap } from '../proposals/proposal';

export class Targets {
  constructor(
    public legalTargetGapGhgKt: number,
    public euTargetGapGhgKt: number,
    public euTargetGapEeGwh: number,
    public euTargetGapReGwh: number) {
  }

  // moneyImageMap = [
  //   { threshold: 17000000000, image: './assets/img/putin/7_putin_crying.jpg' },
  //   { threshold: 20000000000, image: './assets/img/putin/6_putin_sad.jpg' },
  //   { threshold: 25000000000, image: './assets/img/putin/5_putin_not_amused.jpg' },
  //   { threshold: 30000000000, image: './assets/img/putin/4_putin_worried.jpg' },
  //   { threshold: 35000000000, image: './assets/img/putin/3_putin_smile.jpg' },
  //   { threshold: 40000000000, image: './assets/img/putin/2_putin_big_smile.jpg' },
  //   { threshold: 99999999999999, image: './assets/img/putin/1_putin_toast.jpg' }
  // ]
}
