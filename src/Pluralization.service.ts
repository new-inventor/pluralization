import StringHelper from './String.helper';
import Locale from './Locale';

export default class PluralizationService {
  private static instance: PluralizationService | undefined;

  public static make(currentLocale: string, locales: { [p: string]: Locale} = {}): PluralizationService {
    if (this.instance === undefined) {
      this.instance = new this(currentLocale, locales);
    }
    return this.instance;
  }

  public constructor(public currentLocale: string, public locales: { [index: string]: Locale } = {}) {
  }

  public pluralize = (word: string, value: number, ...params: unknown[]): string => {
    return this.locales[this.currentLocale].pluralize(word, value, params);
  };

  public pluralizeTemplate = (template: string, value: number): string => {
    const placeholders = StringHelper.getPlaceholders(template, (placeholder: string) => {
      if (placeholder === 'n') {
        return '' + value;
      }
      const parts = placeholder.split('|');
      return this.locales[this.currentLocale].pluralize(parts[0], value, ...parts.slice(1));
    });
    return StringHelper.replacePlaceholders(template, placeholders);
  }
}
