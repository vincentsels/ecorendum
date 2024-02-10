import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { EnumsService } from './enums.service';

@Pipe({ name: 'translateEnum' })
export class TranslateEnumPipe implements PipeTransform {
  constructor(private translate: TranslateService, private enums: EnumsService) {}

  transform(value: any, enumType: keyof EnumsService): Observable<string> {
    return this.translate.get('enums.' + enumType + '.' + this.enums[enumType][value]);
  }
}
