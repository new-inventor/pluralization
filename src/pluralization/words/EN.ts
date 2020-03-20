import { Word } from './Word';

export class EN extends Word {
  public readonly rule: Array<(value: number) => boolean> = [
    (value: number) => {
      return value === 1;
    },
    (value: number) => {
      return value > 1 || value === 0;
    },
  ];

  public pluralise(count: number): string {
    return this.getWord(count);
  }

  protected getCaseVariations() {
    return ['', 's'];
  }
}
