import { Component, Input } from '@angular/core';
import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, ProposalOrigin, Sector, Target, Variant } from '../proposal';
import { EnumsService } from '../../../common/enums.service';

@Component({
  selector: 'app-proposal-editor',
  templateUrl: './proposal-editor.component.html',
  styleUrls: ['./proposal-editor.component.scss']
})
export class ProposalEditorComponent {
  @Input() proposal: Proposal = new Proposal();

  // Initialize with a default variant
  constructor(public enums: EnumsService) {
    this.addVariant();
  }

  policyLevels = Object.keys(PolicyLevel).filter(Number).map(Number);
  sectors = Object.keys(Sector).filter(Number).map(Number);
  proposalOrigins = Object.keys(ProposalOrigin).filter(Number).map(Number);

  addVariant() {
    this.proposal.variants.push(new Variant());
  }

  removeVariant(i: number) {
    this.proposal.variants.splice(i, 1);
  }

  addYearCost(variant: Variant) {
    // Example implementation, adjust as per your data structure
    const newYear = new Date().getFullYear();
    variant.costPerYearVariable = { ...variant.costPerYearVariable, [newYear]: 0 };
  }

  getCostPerYearVariableKeys(variant: Variant) {
    return Object.keys(variant.costPerYearVariable || {}).map(y => Number(y));
  }

  addTarget(variant: Variant) {
    variant.targets.push(new Target());
  }

  addImpact(variant: Variant) {
    variant.impacts.push(new Impact(ImpactDomain.aerosols, ImpactAmount.neutral));
  }
}
