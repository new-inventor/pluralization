import {SmartPluralizationService} from '../src/Pluralization.service';
// @ts-ignore
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// @ts-ignore
export class PluralizationService extends SmartPluralizationService {}
