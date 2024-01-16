import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ContextService } from '../context/context.service';
import { ProposalService } from '../proposals/proposal.service';
import { PartyId } from '../party';
import { Observable, map } from 'rxjs';
import { PartySetResult } from './party-set-result';
import { ResultsService } from '../results/results.service';
import { EnumsService } from '../../common/enums.service';

@Component({
  selector: 'app-select-party-set-dialog',
  templateUrl: './select-party-set-dialog.component.html',
  styleUrls: ['./select-party-set-dialog.component.scss']
})
export class SelectPartySetDialogComponent {
  partySetResults$?: Observable<PartySetResult[]>;

  constructor(public contextService: ContextService, public proposalService: ProposalService,
    private resultsService: ResultsService, private enums: EnumsService,
    private dialogRef: MatDialogRef<SelectPartySetDialogComponent>) {
    this.partySetResults$ = this.contextService.partyIds$.pipe(map(partyIdsInContext => {
      return partyIdsInContext.map(partyId => {
        const set = proposalService.getProposalSetByType('party', partyId);
        if (set.length === 0) return new PartySetResult(partyId, false);

        let proposals = proposalService.getAllProposalsForSelectedContext();
        proposalService.selectProposalSet(set, proposals);
        proposals = proposals.filter(p => p.committed || set.map(s => s.id).includes(p.id));
        const results = resultsService.calculateResults(proposals);

        const partyResults = new PartySetResult(partyId, true, set.length, results);

        return partyResults;
      });
    }));
  }

  parties = this.enums.PartyId;

  selectParty(partyId: PartyId) {
    this.proposalService.updateSelectedParty(partyId);
    this.proposalService.loadActiveProposalSet({ setType: 'party' });
    this.dialogRef.close();
  }
}
