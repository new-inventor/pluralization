export abstract class Locale {
  public readonly rule: Array<(value: number) => boolean> = [];

  public pluralize(word: string, count: number, ...params: unknown[]): string {
    return word + this.getEnding(count, this.getCaseVariations(...params));
  }

  protected abstract getCaseVariations(...params: unknown[]): string[];

  protected getEnding(count: number, caseVariations: string[]): string {
    const rulesCount = this.rule.length;
    for (let i = rulesCount - 1; i >= 0; i--) {
      if (this.rule[i](count)) {
        return caseVariations[i];
      }
    }
    return caseVariations[0];
  }
}
