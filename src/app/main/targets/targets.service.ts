import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { SectorEmissions, Target, Targets } from "./targets";
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
    contextService.context$.subscribe(c => this.sectorEmissions$.next(this.getSectorEmissionsByContext(c)));
  }

  getTargetsByContext(context: ContextType): Targets {
    if (context === 'flanders') {
      return new Targets(
        new Target(73400, 39060, 34300, 1990, 86800, 55), // Number VEKA
        new Target(43700, 26700, 17000, 2005, 50400, 47), // 50.4 (2005 ESR) - 47% (23.7) = 26.7 target in 2030. 2021 = 43.7 - 26.7 (target) = 17.0 gap
        // 2005: 65 T (res) + 29 T (n-res) + 113 T (indus) + 72 T (transp) + 9 T (agr) = 288 T. Target = 30% reduct: 201 TWh.
        // 2021: 57 T (res) + 30 T (n-res) + 108 T (indus) + 74 T (transp) + 9 T (agr) = 278 T. Gap = 278 - 201 = 77 Twh.
        // Planned 2030: 44 T (res) + 24 T (n-res) + 114 T (indus) + 65 T (transp) + 4 (agr) = 251 Twh.
        new Target(278000, 201000, 77000, 2005, 288000, 30), // To verify
        new Target(25820, 29820, 4000, 2005, 44500, 33), // To verify
      );
    } else if (context === 'brussels') {
      return new Targets(
        new Target(73400 / 10, 39060 / 10, 34300 / 10, 1990, 86800/ 10, 55), // TODO
        new Target(43700 / 10, 26700 / 10, 17000 / 10, 2005, 50400 / 10, 47), // TODO
        new Target(278000 / 10, 201000 / 10, 77000 / 10, 2005, 288000 / 10, 30), // TODO
        new Target(25820 / 10, 29820 / 10, 4000 / 10, 2005, 44500 / 10, 33), // TODO
      );
    } else if (context === 'wallonia') {
      return new Targets(
        new Target(73400 / 2, 39060 / 2, 34300 / 2, 1990, 86800 / 2, 55), // Number VEKA
        new Target(43700 / 2, 26700 / 2, 17000 / 2, 2005, 50400 / 2, 47), // TODO
        new Target(278000 / 2, 201000 / 2, 77000 / 2, 2005, 288000 / 2, 30), // TODO
        new Target(25820 / 2, 29820 / 2, 4000 / 2, 2005, 44500 / 2, 33), // TODO
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
