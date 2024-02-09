import { DecimalPipe } from "@angular/common";
import { Cost } from "../main/proposals/proposal";

export function getAmtSuffix(amt: number) {
  return Math.abs(amt) >= 1000000000 ? 'B' : Math.abs(amt) >= 1000000 ? 'M' : 'k';
}

export function getAmt(cost: number, full: boolean, suffix: 'B' | 'M' | 'k'): number {
  if (full) return cost;
  else {
    const divider = suffix === 'B' ? 1000000000 : suffix === 'M' ? 1000000 : 1000;
    return Math.round((cost || 0) / divider * 100) / 100;
  }
}

export function formatAmt(cost: Cost, amt: any, full: boolean, suffix: 'B' | 'M' | 'k', valueType: string, numberPipe: DecimalPipe) {
  if (cost.estimate) {
    amt = numberPipe.transform(getAmt(cost.estimate, full, suffix));
  } else {
    if (valueType === 'min') amt = new Cost(cost.estimate || cost.min);
    else if (valueType === 'max') amt = new Cost(cost.estimate || cost.max);
    else if (valueType === 'avg') amt = numberPipe.transform(getAmt(cost.estimate || (((cost.min || 0) + (cost.max || 0)) / 2), full, suffix));
    else {
      const min = numberPipe.transform(getAmt(cost.min || 0, full, suffix));
      const max = numberPipe.transform(getAmt(cost.max || 0, full, suffix));
      amt = (min === max) ? '' + min : min + ' à ' + max;
    }
  }
  return amt;
}
