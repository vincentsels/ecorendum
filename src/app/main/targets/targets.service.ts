import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { SectorEmissions, Targets } from "./targets";
import { ContextType, ContextService } from "../context/context.service";

@Injectable()
export class TargetsService {
  targets$: BehaviorSubject<Targets>;
  sectorEmissions$: BehaviorSubject<SectorEmissions>;

  constructor(private contextService: ContextService) {
    this.targets$ = new BehaviorSubject<Targets>(this.getTargetsByContext(this.contextService.context$.value));
    this.sectorEmissions$ = new BehaviorSubject<SectorEmissions>(this.getSectorEmissionsByContext(this.contextService.context$.value));

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

  getSectorEmissionsByContext(context: ContextType): SectorEmissions {
    if (context === 'flanders') {
      return new SectorEmissions(
        8600, // electricity
        26100, // industry
        12600, // buildings
        16100, // transport
        7800, // agriculture
        2300 // waste
      );
    } else if (context === 'brussels') {
      return new SectorEmissions(
        8600 / 10, // electricity
        26100 / 10, // industry
        12600 / 10, // buildings
        16100 / 10, // transport
        7800 / 10, // agriculture
        2300 / 10 // waste
      );
    } else if (context === 'wallonia') {
      return new SectorEmissions(
        8600 / 2, // electricity
        26100 / 2, // industry
        12600 / 2, // buildings
        16100 / 2, // transport
        7800 / 2, // agriculture
        2300 / 2 // waste
      );
    } else {
      throw new Error('Unknown context');
    }
  }
}
