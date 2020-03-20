import { RU } from './words/RU';
import { EN } from './words/EN';

export enum LocaleName {
  RU = 'RU',
  EN = 'EN',
}

export const locales = {
  [LocaleName.RU]: RU,
  [LocaleName.EN]: EN,
};
