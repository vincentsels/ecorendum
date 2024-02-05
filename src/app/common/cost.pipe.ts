import { Pipe, PipeTransform } from '@angular/core';
import { Cost } from '../main/proposals/proposal';

@Pipe({ name: 'cost' })
export class CostPipe implements PipeTransform {
  transform(value?: Cost | number, full: boolean = false): string {
    if (!value) return '';

    const cost = typeof value === 'number' ? new Cost({ estimate: value }) : new Cost(value);

    let ret = '€\u00A0';

    const avg = cost.estimate || (((cost.min || 0) + (cost.max || 0)) / 2);

    if (Math.abs(avg) > 100000000) {
      // Larger than: 100.000.000: show as billion
      let amt = '';
      if (cost.estimate) {
        amt = '' + Math.round(cost.estimate / 1000000000 * 100) / 100;
      } else {
        const min = Math.round((cost.min || 0) / 1000000000 * 100) / 100;
        const max = Math.round((cost.max || 0) / 1000000000 * 100) / 100;
        amt = (min === max) ? '' + min : min + '-' + max;
      }
      return ret + amt + '\u00A0' + 'B';
    } else if (Math.abs(avg) > 500000) {
      // Larger than: 500.000: show as million
      let amt = '';
      if (cost.estimate) {
        amt = '' + Math.round(cost.estimate / 1000000 * 100) / 100;
      } else {
        const min = Math.round((cost.min || 0) / 1000000 * 100) / 100;
        const max = Math.round((cost.max || 0) / 1000000 * 100) / 100;
        amt = (min === max) ? '' + min : min + '-' + max;
      }
      return ret + amt + '\u00A0' + 'M';
    } else {
      // Else: show as k
      let amt = '';
      if (cost.estimate) {
        amt = '' + Math.round(cost.estimate / 1000 * 100) / 100;
      } else {
        const min = Math.round((cost.min || 0) / 1000 * 100) / 100;
        const max = Math.round((cost.max || 0) / 1000 * 100) / 100;
        amt = (min === max) ? '' + min : min + '-' + max;
      }
      return ret + amt + '\u00A0' + 'k';
    }
  }
}
