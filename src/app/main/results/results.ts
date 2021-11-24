// TODO: find out real numbers...
// export class Results {
//   ktGhg2005 = 78637;
//   ktGhgCommittedWem = 52662;
//   ktGhgReductionNeededWam = 41668;
//   ktGhgGapToFill = 10994;
// }

export class Results {
  constructor(props: Partial<Results> = {}) {
    Object.assign(this, props);
  }

  static ghgGapCumulativeKt = 50000; // See below
  static eeGapTargetGwh = 20000; // Still to be calculated
  static reGapTargetGwh = 10000; // Still to be calculated

  static pricePerKtGhg = 100000;

  ghgReducedKt = 0;
  energySavedGwh = 0;
  reAddedGwh = 0;

  ghgReductionColor = 'warn';
  energySavedColor = 'warn';
  renewableEnergyAddedColor = 'warn';

  ghgReductionPercentage = 0;
  energySavedPercentage = 0;
  reAddedPercentage = 0;

  ghgTax = 0;
  ghgIncome = 0;

  totalCost = 0;
}

/*
Calculation ghgGapKt

11000	- 1375
9625
8250
6875
5500
4125
2750
1375
0
-------
= 49500
*/
