export interface IWord {
  readonly rule: Array<(value: number) => boolean>;
  readonly base: string;
  pluralise(count: number, ...params: any[]): string;
}

export interface IRawWord {
  base: string;
  cases?: {[index: string]: string []};
}

export abstract class Word implements IWord {
  public readonly rule: Array<(value: number) => boolean> = [];

  protected constructor(public readonly base: string) {
  }

  public pluralise(count: number, ...params: any[]): string {
    return this.getWord(count, ...params);
  }

  protected getWord(count: number, ...params: any[]) {
    return this.base + this.getEnding(count, this.getCaseVariations(...params));
  }

  protected getCaseVariations(...params: any) {
    return [''];
  }

  protected getEnding(count: number, caseVariations: string[]) {
    const rulesCount = this.rule.length;
    for (let i = rulesCount - 1; i >= 0; i--) {
      if (this.rule[i](count)) {
        return caseVariations[i];
      }
    }
    return caseVariations[0];
  }
}
