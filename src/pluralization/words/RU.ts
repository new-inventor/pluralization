import { Word } from './Word';
import { IDictionary } from '../Dictionary';

export enum Modifier {
  NOMINATIVE = 'nominative',
  GENITIVE = 'genitive',
  DATIVE = 'dative',
  ACCUSATIVE = 'accusative',
  INSTRUMENTAL = 'instrumental',
  PREPOSITIONAL = 'prepositional',
  MALE = 'male',
  FEMALE = 'female',
  GENERAL = 'general',
}

export class RU extends Word {
  public readonly rule: Array<(value: number) => boolean> = [
    (value: number) => {
      return value % 10 === 1;
    },
    (value: number) => {
      return value % 10 >= 2;
    },
    (value: number) => {
      return value % 10 >= 5 || value % 10 === 0 || (value > 10 && value < 20);
    },
  ];

  constructor(base: string, public readonly cases: IDictionary<string[]>) {
    super(base);
  }

  public pluralise(count: number, modifier?: Modifier): string {
    return this.getWord(count, modifier);
  }

  protected getCaseVariations(modifier?: Modifier) {
    return this.cases.get(modifier ? modifier : this.cases.keys()[0]);
  }
}
