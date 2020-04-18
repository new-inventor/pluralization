import RU from './RU';
import EN from './EN';

export * from './EN';
export * from './RU';

export enum LocaleName {
  RU = 'RU',
  EN = 'EN',
}

export default {
  RU: typeof RU,
  EN: typeof EN,
};

