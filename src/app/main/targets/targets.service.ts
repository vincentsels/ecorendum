import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Targets } from "./targets";

@Injectable()
export class TargetsService {
  targets$: BehaviorSubject<Targets>;

  constructor() {
    this.targets$ = new BehaviorSubject<Targets>(new Targets())
  }
}
