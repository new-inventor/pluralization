import {Singleton} from '@/models/Singleton';
import {IWordsList} from './WordsList';
import {LocaleName} from './Locales';
import {StringHelper} from '@/helpers/StringHelper';

export class PluralizationService extends Singleton {
  public locales: { [index: string]: IWordsList } = {};

  constructor(public currentLocale: LocaleName) {
    super();
  }

  public pluralize(template: string, value: number, locale: LocaleName = this.currentLocale) {
    const placeholders = StringHelper.getPlaceholders(
      template,
      (placeholder: string) => {
        if (placeholder === 'n') {
          return '' + value;
        }
        const parts = placeholder.split('|');
        const word = this.locales[locale].get(parts[0]);
        return word.pluralise(Number.parseInt(parts[0], 10), ...parts.slice(1));
      }
    );
    return StringHelper.replacePlaceholders(template, placeholders);
  }
}
