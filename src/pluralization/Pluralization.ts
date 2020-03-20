import { PluralizationService } from './PluralizationService';
import { LocaleName } from './Locales';
import { IRawWord } from './words/Word';
import forOwn from 'lodash/forOwn';

const PluralizationPlugin: any = {};

PluralizationPlugin.install = (Vue: any, currentLocale: LocaleName, languages?: { [index: string]: IRawWord }) => {
  const service = new PluralizationService(currentLocale);
  if (languages) {
    forOwn(languages, (lang: IRawWord, name: string) => {
      service.locales[name].load(lang);
    });
  }
  Vue.mixin({
    data: () => {
      return {
        pluralizer: service,
      };
    },
  });
  Vue.filter('pluralize', service.pluralize);
};

export default PluralizationPlugin;
