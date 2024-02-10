import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inset-link',
  template: `
<a class="inset-link" (click)="toggleInset()">{{ ('explainers.insets.' + insetTranslationKey + '.link') | translate }}
<mat-icon class="material-symbols-outlined inline" *ngIf="!insetVisible">info</mat-icon>
<mat-icon class="material-symbols-outlined inline" *ngIf="insetVisible">cancel</mat-icon>
</a>
<span [style.display]="insetVisible ? 'block' : 'none'" class="inset" [innerHtml]="('explainers.insets.' + insetTranslationKey + '.text') | translate"></span>`,
  styles: [
`
.inset {
  margin: 12px;
  opacity: 0.8;
}

.inline {
  font-size: 100%;
  vertical-align: middle;
}
`
  ],
})
export class InsetLinkComponent {
  constructor() {}

  @Input({ required: true }) insetTranslationKey!: string;

  insetVisible = false;

  toggleInset = () => this.insetVisible = !this.insetVisible;
}
