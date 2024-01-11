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
        34300, // Should be pretty ok
        27400, // Rough estimate
        10000, // Rough order of magnitude
        5000, // Rough order of magnitude
      );
    } else if (context === 'brussels') {
      return new Targets(
        3430, // Made up
        2740, // Made up
        1000, // Made up
        500, // Made up
      );
    } else if (context === 'wallonia') {
      return new Targets(
        34300 / 2, // Made up
        27400 / 2, // Made up
        10000 / 2, // Made up
        5000 / 2, // Made up
      );
    } else {
      throw new Error('Unknown context');
    }
  }
}
