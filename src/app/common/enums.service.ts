import { Injectable } from '@angular/core';
import { PartyId } from '../main/party';
import { ImpactAmount, ImpactDomain, PolicyLevel, Sector, TargetType } from '../main/proposals/proposal';

@Injectable()
export class EnumsService {
  Sector = Sector;
  TargetType = TargetType;
  ImpactDomain = ImpactDomain;
  ImpactAmount = ImpactAmount;
  PartyId = PartyId;
  PolicyLevel = PolicyLevel;
}
