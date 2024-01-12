import { Injectable } from "@angular/core";
import { ProposalSet } from "./proposal";

// Written and tested by ChatGPT
@Injectable()
export class ProposalSetSerializerService {
  public encodeVariants(variants: ProposalSet): string {
    let binaryString = this.packToBinary(variants);
    return this.encodeToBase64(binaryString);
  }

  public decodeVariants(encoded: string): ProposalSet {
    let binaryString = this.decodeFromBase64(encoded);
    return this.unpackFromBinary(binaryString);
  }

  private packToBinary(variants: ProposalSet): string {
    let binaryString = '';
    for (const variant of variants) {
      let binaryId = variant.id.toString(2).padStart(8, '0');
      let binaryVariant = variant.variant.toString(2).padStart(2, '0');
      binaryString += binaryId + binaryVariant;
    }
    return binaryString;
  }

  private encodeToBase64(binaryString: string): string {
    let buffer = new Uint8Array(Math.ceil(binaryString.length / 8));
    for (let i = 0; i < binaryString.length; i += 8) {
      buffer[i / 8] = parseInt(binaryString.substring(i, i + 8), 2);
    }
    return btoa(String.fromCharCode(...buffer));
  }

  private decodeFromBase64(base64: string): string {
    let binaryString = '';
    let bytes = new Uint8Array(atob(base64).split("").map(char => char.charCodeAt(0)));
    for (let byte of bytes) {
      binaryString += byte.toString(2).padStart(8, '0');
    }
    return binaryString;
  }

  private unpackFromBinary(binaryString: string): ProposalSet {
    let variants = [];
    for (let i = 0; i < binaryString.length; i += 10) {
      let binaryId = binaryString.substring(i, i + 8);
      let binaryVariant = binaryString.substring(i + 8, i + 10);
      let id = parseInt(binaryId, 2);
      let variant = parseInt(binaryVariant, 2);
      variants.push({ id, variant });
    }
    return variants;
  }
}
