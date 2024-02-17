import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { SectorEmissions, Targets } from "./targets";
import { ContextType, ContextService } from "../context/context.service";
import { Sector } from "../proposals/proposal";

@Injectable()
export class TargetsService {
  targets$: BehaviorSubject<Targets>;
  sectorEmissions$: BehaviorSubject<SectorEmissions[]>;

  constructor(private contextService: ContextService) {
    this.targets$ = new BehaviorSubject<Targets>(this.getTargetsByContext(this.contextService.context$.value));
    this.sectorEmissions$ = new BehaviorSubject<SectorEmissions[]>(this.getSectorEmissionsByContext(this.contextService.context$.value));

    contextService.context$.subscribe(c => this.targets$.next(this.getTargetsByContext(c)));
  }

  getTargetsByContext(context: ContextType): Targets {
    if (context === 'flanders') {
      return new Targets(
        34300, // Number VEKA
        17000, // 50.4 (2005 ESR) - 47% (23.7) = 26.7 target in 2030. 2021 = 43.7 - 26.7 (target) = 17.0 gap
        5000, // TO DO
        4000, // TO DO
      );
    } else if (context === 'brussels') {
      return new Targets(
        34300 / 10, // TO DO
        17000 / 10, // TO DO
        5000 / 10, // TO DO
        4000 / 10, // TO DO
      );
    } else if (context === 'wallonia') {
      return new Targets(
        34300 / 2, // TO DO
        1700 / 2, // TO DO
        5000 / 2, // TO DO
        4000 / 2, // TO DO
      );
    } else {
      throw new Error('Unknown context');
    }
  }

  getSectorEmissionsByContext(context: ContextType): SectorEmissions[] {
    if (context === 'flanders') {
      return [
        new SectorEmissions(Sector.electricityProduction, 8600),
        new SectorEmissions(Sector.industry, 26100),
        new SectorEmissions(Sector.buildings, 12600),
        new SectorEmissions(Sector.transport, 16100),
        new SectorEmissions(Sector.agriculture, 7800),
        new SectorEmissions(Sector.wasteManagement, 2300),
      ];
    } else if (context === 'brussels') {
      return [
        new SectorEmissions(Sector.electricityProduction, 8600 / 10),
        new SectorEmissions(Sector.industry, 26100 / 10),
        new SectorEmissions(Sector.buildings, 12600 / 10),
        new SectorEmissions(Sector.transport, 16100 / 10),
        new SectorEmissions(Sector.agriculture, 7800 / 10),
        new SectorEmissions(Sector.wasteManagement, 2300 / 10),
      ];
    } else if (context === 'wallonia') {
      return [
        new SectorEmissions(Sector.electricityProduction, 8600 / 2),
        new SectorEmissions(Sector.industry, 26100 / 2),
        new SectorEmissions(Sector.buildings, 12600 / 2),
        new SectorEmissions(Sector.transport, 16100 / 2),
        new SectorEmissions(Sector.agriculture, 7800 / 2),
        new SectorEmissions(Sector.wasteManagement, 2300 / 2),
      ];
    } else {
      throw new Error('Unknown context');
    }
  }
}
