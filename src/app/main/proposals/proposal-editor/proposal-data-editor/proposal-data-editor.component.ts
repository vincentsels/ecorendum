import { Component, Input } from '@angular/core';

import { Cost, Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, ProposalOrigin, Sector, Target, TargetType, Variant } from '../../proposal';
import { ContextType } from '../../../context/context.service';
import { EnumsService } from '../../../../common/enums.service';
import { ProposalTranslationsContainer } from '../translation-data';

type AllRegionsType = ContextType | 'federal';

@Component({
  selector: 'app-proposal-data-editor',
  templateUrl: './proposal-data-editor.component.html',
  styleUrls: ['../proposal-editor.component.scss']
})
export class ProposalDataEditorComponent {
  constructor(public enums: EnumsService) {
  }

  allContexts: ContextType[] = ['flanders', 'brussels', 'wallonia'];
  allRegions: AllRegionsType[] = ['federal', 'flanders', 'brussels', 'wallonia'];

  policyLevels = Object.keys(PolicyLevel).filter(Number).map(Number);
  sectors = Object.keys(Sector).filter(Number).map(Number);
  proposalOrigins = Object.keys(ProposalOrigin).filter(Number).map(Number);
  targetTypes = Object.values(TargetType).filter(Number).map(Number);
  impactDomains = Object.values(ImpactDomain).filter(Number).map(Number);
  impactAmounts = Object.values(ImpactAmount).filter(Number).map(Number);

  selectedVariant = 0;

  @Input({ required: true }) proposal!: Proposal;
  @Input({ required: true }) translationData!: ProposalTranslationsContainer;

  targetTypeToUnitMap = {
    [TargetType.energyEfficiency]: 'GWh',
    [TargetType.ghgReduction]: 'kt',
    [TargetType.renewableEnergy]: 'GWh',
    [TargetType.none]: '',
  }

  addVariant() {
    const variant = new Variant();
    variant.ambitionLevel = this.proposal.variants.length + 1;
    variant.proposal = this.proposal;
    this.proposal.variants.push(variant);
    this.selectedVariant = variant.ambitionLevel - 1;
    this.translationData.addVariant(variant.ambitionLevel);
  }

  copyVariant(origVariant: Variant) {
    const variant = new Variant(origVariant);
    variant.ambitionLevel = this.proposal.variants.length + 1;
    variant.proposal = this.proposal;
    this.proposal.variants.push(variant);
    this.selectedVariant = variant.ambitionLevel - 1;
    this.translationData.addVariant(variant.ambitionLevel);
  }

  removeVariant(i: number) {
    this.proposal.variants.splice(i, 1);
    this.translationData.removeVariant(i + 1); // Id is one larger than index
  }

  addYearCost(variant: Variant) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + Object.keys(variant.costPerYearVariable || {}).length);

    const newYear = date.getFullYear();
    variant.costPerYearVariable = { ...variant.costPerYearVariable, [newYear]: new Cost() };
  }

  removeYearCost(variant: Variant, year: number) {
    if (variant.costPerYearVariable && variant.costPerYearVariable.hasOwnProperty(year)) {
      delete variant.costPerYearVariable[year];
    }
  }

  getCostPerYearVariableKeys(variant: Variant) {
    return Object.keys(variant.costPerYearVariable || {}).map(y => Number(y));
  }

  addTarget(variant: Variant) {
    variant.targets.push(new Target());
  }

  removeTarget(variant: Variant, targetIndex: number) {
    variant.targets.splice(targetIndex, 1);
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

  removeRegionalTarget(variant: Variant, region: ContextType, targetIndex: number) {
    if (variant.regionalTargets && variant.regionalTargets![region]) {
      variant.regionalTargets[region].splice(targetIndex, 1);
    }
  }

  addImpact(variant: Variant) {
    variant.impacts.push(new Impact(ImpactDomain.localAirPollution, ImpactAmount.neutral));
  }

  removeImpact(variant: Variant, impactIndex: number) {
    variant.impacts.splice(impactIndex, 1);
  }
}
