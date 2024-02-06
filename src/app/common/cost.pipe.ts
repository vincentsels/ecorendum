import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Cost } from '../main/proposals/proposal';

@Pipe({ name: 'cost' })
export class CostPipe implements PipeTransform {
  constructor(private numberPipe: DecimalPipe) {}

  transform(value?: Cost | number, full: boolean = false): string {
    if (!value) return '';

    const cost = typeof value === 'number' ? new Cost({ estimate: value }) : new Cost(value);
    const avg = cost.estimate || (((cost.min || 0) + (cost.max || 0)) / 2);
    const suffix = getAmtSuffix(avg);

    let amt;

    if (cost.estimate) {
      amt = this.numberPipe.transform(getAmt(cost.estimate, full, suffix));
    } else {
      const min = this.numberPipe.transform(getAmt(cost.min || 0, full, suffix));
      const max = this.numberPipe.transform(getAmt(cost.max || 0, full, suffix));
      amt = (min === max) ? '' + min : min + ' à ' + max;
    }

    let ret = '€\u00A0';
    if (full) return ret + amt;
    else return ret + amt + '\u00A0' + suffix;
  }
}

export function getAmtSuffix(amt: number) {
  return Math.abs(amt) > 100000000 ? 'B' : Math.abs(amt) > 500000 ? 'M' : 'k';
}

export function getAmt(cost: number, full: boolean, suffix: 'B' | 'M' | 'k'): number {
  if (full) return cost;
  else {
    const divider = suffix === 'B' ? 1000000000 : suffix === 'M' ? 1000000 : 1000;
    return Math.round((cost || 0) / divider * 100) / 100;
  }
}
