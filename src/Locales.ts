import {RU} from './locales/RU';
import {EN} from './locales/EN';

export enum LocaleName {
  RU = 'RU',
  EN = 'EN',
}

export const locales = {
  [LocaleName.RU]: RU,
  [LocaleName.EN]: EN,
};
