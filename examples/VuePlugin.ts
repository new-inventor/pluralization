import {SmartPluralizationService} from '../src/Pluralization.service';
import {LocaleName} from '../src/Locales';
import {Locale} from "../src/Locale";

const PluralizationPlugin: any = {};

PluralizationPlugin.install = (
  Vue: any,
  options: { currentLocale: LocaleName; locales: {[index: string]: Locale}} = {currentLocale: LocaleName.EN, locales: {}}
  ): void => {
  const service = SmartPluralizationService.make(options.currentLocale, options.locales);
  Vue.mixin({
    data: () => {
      return {
        pluralizer: service,
      };
    },
  });
  Vue.filter('pluralizeTemplate', service.pluralizeTemplate);
  Vue.filter('pluralize', service.pluralize);
};

export default PluralizationPlugin;
