import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Targets } from "./targets";
import { Context, ContextService } from "../context/context.service";

@Injectable()
export class TargetsService {
  targets$: BehaviorSubject<Targets>;

  constructor(private contextService: ContextService) {
    this.targets$ = new BehaviorSubject<Targets>(this.getTargetsByContext(this.contextService.context$.value));

    contextService.context$.subscribe(c => this.targets$.next(this.getTargetsByContext(c)));
  }

  getTargetsByContext(context: Context): Targets {
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
}
