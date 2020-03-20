import {ObjectHelper} from '@/helpers/ObjectHelper';
import {PluralizationService} from './PluralizationService';
import {LocaleName} from './Locales';
import {IRawWord} from './words/Word';

const PluralizationPlugin: any = {};

PluralizationPlugin.install = (Vue: any, currentLocale: LocaleName, languages?: {[index: string]: IRawWord}) => {
  const service = new PluralizationService(currentLocale);
  if (languages) {
    ObjectHelper.forEach(languages, (lang: IRawWord, name: LocaleName) => {
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
