import { Component, Input } from '@angular/core';
import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, ProposalOrigin, Sector, Target, TargetType, Variant } from '../proposal';
import { EnumsService } from '../../../common/enums.service';
import { ProposalService } from '../proposal.service';
import { ProposalDetail } from '../proposal-details';
import { PROPOSALS_FEDERAL } from '../proposal-data/proposals-federal';
import { PROPOSALS_FLANDERS } from '../proposal-data/proposals-flanders';
import { ContextType } from '../../context/context.service';
import { PROPOSALS_BRUSSELS } from '../proposal-data/proposals-brussels';
import { PROPOSALS_WALLONIA } from '../proposal-data/proposals-wallonia';

type AllRegionsType = ContextType | 'federal';

@Component({
  selector: 'app-proposal-editor',
  templateUrl: './proposal-editor.component.html',
  styleUrls: ['./proposal-editor.component.scss']
})
export class ProposalEditorComponent {
  @Input() proposal: Proposal = new Proposal();

  // Initialize with a default variant
  constructor(public enums: EnumsService, public proposalService: ProposalService) {
    this.addVariant();
    this.allProposals = {
      federal: [...PROPOSALS_FEDERAL],
      flanders: [...PROPOSALS_FLANDERS],
      brussels: [...PROPOSALS_BRUSSELS],
      wallonia: [...PROPOSALS_WALLONIA],
    }
  }

  allContexts: ContextType[] = ['flanders', 'brussels', 'wallonia'];
  allRegions: AllRegionsType[] = ['federal', 'flanders', 'brussels', 'wallonia'];

  allProposals: { [policyLevel in AllRegionsType]: ProposalDetail[] };

  policyLevels = Object.keys(PolicyLevel).filter(Number).map(Number);
  sectors = Object.keys(Sector).filter(Number).map(Number);
  proposalOrigins = Object.keys(ProposalOrigin).filter(Number).map(Number);
  targetTypes = Object.values(TargetType).filter(Number).map(Number);
  impactDomains = Object.values(ImpactDomain).filter(Number).map(Number);
  impactAmounts = Object.values(ImpactAmount).filter(Number).map(Number);

  load(selectedProposal: ProposalDetail) {
    this.proposal = selectedProposal;
  }

  addVariant() {
    this.proposal.variants.push(new Variant());
  }

  removeVariant(i: number) {
    this.proposal.variants.splice(i, 1);
  }

  addYearCost(variant: Variant) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + Object.keys(variant.costPerYearVariable || {}).length);

    const newYear = date.getFullYear();
    variant.costPerYearVariable = { ...variant.costPerYearVariable, [newYear]: 0 };
  }

  getCostPerYearVariableKeys(variant: Variant) {
    return Object.keys(variant.costPerYearVariable || {}).map(y => Number(y));
  }

  addTarget(variant: Variant) {
    variant.targets.push(new Target());
  }


  getRegionalTargets(variant: Variant, region: ContextType): Target[] {
    return variant.regionalTargets?.[region] || [];
  }

  addRegionalTarget(variant: Variant, region: ContextType) {
    if (!variant.regionalTargets) {
      variant.regionalTargets = {
        flanders: [],
        brussels: [],
        wallonia: [],
      };
    }
    if (!variant.regionalTargets[region]) {
      variant.regionalTargets[region] = [];
    }
    variant.regionalTargets[region].push(new Target());
  }

  addImpact(variant: Variant) {
    variant.impacts.push(new Impact(ImpactDomain.aerosols, ImpactAmount.neutral));
  }
}
