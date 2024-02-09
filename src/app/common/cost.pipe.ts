import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Cost } from '../main/proposals/proposal';
import { formatAmt, getAmtSuffix } from './cost-helpers';

@Pipe({ name: 'cost' })
export class CostPipe implements PipeTransform {
  constructor(private numberPipe: DecimalPipe) {}

  transform(value?: Cost | number, full: boolean = false, valueType: 'min-max' | 'min' | 'max' | 'avg' = 'min-max'): string {
    if (!value) return '';

    const cost = typeof value === 'number' ? new Cost({ estimate: value }) : new Cost(value);
    const avg = cost.estimate || (((cost.min || 0) + (cost.max || 0)) / 2);
    const suffix = getAmtSuffix(avg);

    let amt;

    amt = formatAmt(cost, amt, full, suffix, valueType, this.numberPipe);

    const prefix = '€\u00A0';
    const avgPrefix = ((valueType === 'avg') && cost.min && cost.min != cost.max) ? '±\u00A0' : ''
    const suffixFormatted = full ? '' : '\u00A0' + suffix;

    return avgPrefix + prefix + amt + suffixFormatted;
  }
}
