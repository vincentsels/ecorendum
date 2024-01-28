import { Component } from '@angular/core';

import { PolicyLevel, Proposal, Variant } from '../proposal';
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
  proposal: Proposal = new Proposal();

  // Initialize with a default variant
  constructor(public enums: EnumsService, public proposalService: ProposalService) {
    this.proposal = new Proposal();
    const variant = new Variant();
    variant.proposal = this.proposal;
    this.proposal.variants.push(variant);

    this.allProposals = {
      federal: [...PROPOSALS_FEDERAL],
      flanders: [...PROPOSALS_FLANDERS],
      brussels: [...PROPOSALS_BRUSSELS],
      wallonia: [...PROPOSALS_WALLONIA],
    }
  }

  allRegions: AllRegionsType[] = ['federal', 'flanders', 'brussels', 'wallonia'];

  allProposals: { [policyLevel in AllRegionsType]: ProposalDetail[] };

  load(selectedProposal: ProposalDetail) {
    this.proposal = selectedProposal;
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
    const serialized = this.proposal.serialize();

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
}
