import reduce from 'lodash/reduce';

export default class StringHelper {
  public static replacePlaceholders(template: string, placeholders: { [index: string]: string }): string {
    return reduce(
      placeholders,
      (acc: string, value: string, placeholder: string) => {
        return acc.replace(placeholder, value);
      },
      template);
  }

  public static getPlaceholders(
    template: string,
    callback: (placeholder: string, ...params: unknown[]) => string,
    ...params: unknown[]
  ): { [index: string]: string } {
    const placeholderRegExp = /{[^}]+}/g;
    const placeholdersList = template.match(placeholderRegExp);
    if (!placeholdersList) {
      return {};
    }
    return placeholdersList.reduce((acc: { [index: string]: string }, el: string) => {
      acc[el] = callback(el.slice(1, -1), ...params);
      return acc;
    }, {});
  }
}
