import Locale from '../Locale';
import WordsList from '../WordsList';

export enum RUModifier {
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

export interface RUWord {
  base: string;
  cases: { [index: string]: string[] };
}

export default class RU extends Locale {
  public readonly rule: Array<(value: number) => boolean> = [
    (value: number): boolean => {
      return value % 10 === 1;
    },
    (value: number): boolean => {
      return value % 10 >= 2;
    },
    (value: number): boolean => {
      return value % 10 >= 5 || value % 10 === 0 || (value > 10 && value < 20);
    },
  ];

  constructor(public words: WordsList<RUWord> = new WordsList<RUWord>()) {
    super();
  }

  public pluralize(word: string, count: number, modifier?: RUModifier): string {
    return word + this.getEnding(count, this.getCaseVariations(word, modifier));
  }

  protected getCaseVariations(word: string, modifier?: RUModifier): string[] {
    const rawWord = this.words.get(word);
    return rawWord.cases[modifier ? modifier : Object.keys(rawWord.cases)[0]];
  }
}
