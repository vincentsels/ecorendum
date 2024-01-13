import { Injectable } from "@angular/core";
import { ProposalSet } from "./proposal";

@Injectable()
export class ProposalSetSerializerService {
  public encode(ps: ProposalSet): string {
    return ps.reduce((s, p) => s + p.id.toString().padStart(3, '0') + p.variant.toString(), '');
  }

  public decode(key: string): ProposalSet {
    const slices = this.splitIntoSlices(key);
    return slices!.map(s => ({ id: Number(s.slice(0, 3)), variant: Number(s.slice(3)) }));
  }

  private splitIntoSlices(str: string): string[] | null {
    return str.match(/.{1,4}/g);
  }
}
