import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'enumtranslate' })
export class TranslateEnumPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: any, exclude: number[] = []) : any {
    const keys: { key: number, value: string }[] = [];
    for (const enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10)) && !exclude.includes(Number(enumMember))) {
        const text = value[enumMember];
        this.translate.get(text).toPromise().then((translation) => {
          const translationOrDefault = translation || this.initCase(text);

          const entry = {
            key: Number(enumMember),
            value: translation || translationOrDefault,
          };
          keys.push(entry);
        });
      }
    }
    return keys;
  }

  // Source: https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case
  initCase(input: string): string {
    return input
    // Insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // Uppercase the first character
    .replace(/^./, s => s.toUpperCase())
    // Trim
    .trim();
  }
}
