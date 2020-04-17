// @ts-ignore
import { Pipe, PipeTransform } from '@angular/core';
import {LocaleName} from "../src/Locales";
import {PluralizationService} from "./AngularService";

// @ts-ignore
@Pipe({name: 'pluralizeTemplate', pure: true})
// @ts-ignore
export class AngularPluralizeTemplatePipe implements PipeTransform {
  constructor(private pluralizationService: PluralizationService){}

  public transform(word: string, value: number, locale?: LocaleName): string {
    return this.pluralizationService.pluralizeTemplate(word, value, locale);
  }
}
