import { PartyId } from "../party";
import { Results } from "../results/results";

export class PartySetResult {
  constructor(
    public partyId: PartyId,
    public received: boolean,
    public measureCount?: number,
    public results?: Results) {}
}
