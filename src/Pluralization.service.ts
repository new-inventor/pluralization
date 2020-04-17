import {Singleton} from 'data_types/lib/Singleton';
import {LocaleName} from './Locales';
import {StringHelper} from './String.helper';
import {Locale} from '@/Locale';

export class SmartPluralizationService extends Singleton {
  protected constructor(public currentLocale: LocaleName, public locales: { [index: string]: Locale } = {}) {
    super();
  }

  public static make(currentLocale: LocaleName, locales: { [index: string]: Locale } = {}): SmartPluralizationService {
    return super.make(currentLocale, locales) as SmartPluralizationService;
  }

  public pluralize = (word: string, value: number, params: any[], locale: LocaleName = this.currentLocale): string => {
    return this.locales[locale].pluralize(word, value, params);
  };

  public pluralizeTemplate = (template: string, value: number, locale: LocaleName = this.currentLocale): string => {
    const placeholders = StringHelper.getPlaceholders(template, (placeholder: string) => {
      if (placeholder === 'n') {
        return '' + value;
      }
      const parts = placeholder.split('|');
      return this.locales[locale].pluralize(parts[0], value, ...parts.slice(1));
    });
    return StringHelper.replacePlaceholders(template, placeholders);
  }
}
