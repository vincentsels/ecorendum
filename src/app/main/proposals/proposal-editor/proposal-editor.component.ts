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
    variant.impacts.push(new Impact(ImpactDomain.aerosols, ImpactAmount.neutral));
  }

  removeImpact(variant: Variant, impactIndex: number) {
    variant.impacts.splice(impactIndex, 1);
  }

  clone() {
    this.proposal = new ProposalDetail(this.proposal);
    if (this.proposal.policyLevel === PolicyLevel.federal) {
      this.proposal.id = Math.max(...PROPOSALS_FEDERAL.map(p => p.id)) + 1;
    } else if (this.proposal.policyLevel === PolicyLevel.flemish) {
      this.proposal.id = Math.max(...PROPOSALS_FLANDERS.map(p => p.id)) + 1;
    } else if (this.proposal.policyLevel === PolicyLevel.brusselian) {
      this.proposal.id = Math.max(...PROPOSALS_BRUSSELS.map(p => p.id)) + 1;
    } else if (this.proposal.policyLevel === PolicyLevel.wallonian) {
      this.proposal.id = Math.max(...PROPOSALS_WALLONIA.map(p => p.id)) + 1;
    } else throw new Error('Unknown policy level');
  }

  download() {
    // Unset circular references before stringify
    const cloneForDownload = new ProposalDetail(this.proposal);
    cloneForDownload.variants.forEach(v => v.proposal = undefined);

    const serialized = JSON.stringify(cloneForDownload);

    const fileName = this.proposal.id + '-' + this.proposal.slugEn + '.json';

    this.downloadFile(serialized, fileName);
  }

  private downloadFile(data: string, fileName: string): void {
    // Step 1: Convert string to Blob
    const blob = new Blob([data], { type: 'application/json' });

    // Step 2: Create Blob URL
    const url = window.URL.createObjectURL(blob);

    // Step 3: Create a new anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    // Append anchor to the body
    document.body.appendChild(a);

    // Step 4: Trigger the download
    a.click();

    // Step 5: Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  getBackgroundImage() {
    return this.proposal.pictureThumb
      ? 'background-image: linear-gradient(145deg, rgba(48, 48, 48, 1) 40%, rgba(48, 48, 48, 0.9) 60%, rgba(48, 48, 48, 0.1) 100%), url(' + this.proposal.pictureThumb + ')'
      : null;
  }
}
