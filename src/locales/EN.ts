import Locale from '../Locale';

export default class EN extends Locale {
  public readonly rule: Array<(value: number) => boolean> = [
    (value: number): boolean => {
      return value === 1;
    },
    (value: number): boolean => {
      return value > 1 || value === 0;
    },
  ];

  protected getCaseVariations(): string[] {
    return ['', 's'];
  }
}
