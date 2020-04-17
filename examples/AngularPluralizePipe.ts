// @ts-ignore
import { Pipe, PipeTransform } from '@angular/core';
import {LocaleName} from "../src/Locales";
import {PluralizationService} from "./AngularService";

// @ts-ignore
@Pipe({name: 'pluralize', pure: true})
// @ts-ignore
export class AngularPluralizePipe implements PipeTransform {
  constructor(private pluralizationService: PluralizationService){}

  public transform(word: string, value: number, params: any[], locale?: LocaleName): string {
    return this.pluralizationService.pluralize(word, value, params, locale);
  }
}
