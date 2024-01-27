import { Component, Input } from '@angular/core';
import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, ProposalOrigin, Sector, Target, Variant } from '../proposal';

@Component({
  selector: 'app-proposal-editor',
  templateUrl: './proposal-editor.component.html',
  styleUrls: ['./proposal-editor.component.scss']
})
export class ProposalEditorComponent {
  @Input() proposal: Proposal = new Proposal();

  policyLevels = Object.values(PolicyLevel);
  sectors = Object.values(Sector);
  proposalOrigins = Object.values(ProposalOrigin);

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

  // Initialize with a default variant
  constructor() {
    this.addVariant();
  }
}
