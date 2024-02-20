import { Injectable } from '@angular/core';
import { PartyId } from '../main/party';
import { ImpactAmount, ImpactDomain, ImpactDomainType, PolicyLevel, ProposalOrigin, Sector, TargetType } from '../main/proposals/proposal';

@Injectable()
export class EnumsService {
  Sector = Sector;
  TargetType = TargetType;
  ImpactDomain = ImpactDomain;
  ImpactDomainType = ImpactDomainType;
  ImpactAmount = ImpactAmount;
  PartyId = PartyId;
  PolicyLevel = PolicyLevel;
  ProposalOrigin = ProposalOrigin;
}
