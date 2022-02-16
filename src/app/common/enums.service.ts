import { Injectable } from '@angular/core';
import { ImpactAmount, ImpactDomain, PolicyLevel, Sector, TargetType } from '../main/proposal';
import { PartyId } from '../main/proposal-details';

@Injectable()
export class EnumsService {
  PolicyLevel = PolicyLevel;
  Sector = Sector;
  TargetType = TargetType;
  ImpactDomain = ImpactDomain;
  ImpactAmount = ImpactAmount;
  PartyId = PartyId;
}
