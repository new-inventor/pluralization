JavaScript and TypeScript Smart Pluralisation
==============================

Overview
--------

This module provides extendable service for pluralize words.

Instead of `"zero | one | more"` notation, we provide endings notation.

In the code do something like this `{{'{n} {билет|genitive}' | pluralizeTemplate(value)}}`
or this `{{value}} {{'билет' | pluralize(value, 'genitive')}}`

This paradigm make code cleaner and make pluralization config slimmer.

Installation
------------

```shell script
npm install @new-inventor/smart_pluralization
```

Usage
-----

To use this library in stand alone(not framework) environment you can use this code:

```typescript
//Initialize service in the beginning of the code
import SmartPluralizationService from '@new-inventor/pluralization/SmartPluralization.service';
import {LocaleName, RUModifier, RUWord} from '@new-inventor/pluralization/locales';
import RU from '@new-inventor/pluralization/locales/RU';
import WordsList from '@new-inventor/pluralization/WordsList';
import ruWords from './ru.pluralization.json';

const pluralizationService = SmartPluralizationService.make(LocaleName.RU, {[LocaleName.RU]: new RU(new WordsList<RUWord>(ruWords))});

//somewhere in the code below
pluralizationService.pluralize('билет', 1, RUModifier.DATIVE);
pluralizationService.pluralizeTemplate('{n} {билет|nominative}', 1);


//or you can implement your own locale by extending the Locale class

import Locale from "@new-inventor/pluralization/Locale";
export default class RU extends Locale {
  public readonly rule: Array<(value: number) => boolean> = [
    (value: number): boolean => {
      return value % 10 === 1;
    },
    (value: number): boolean => {
      return value % 10 >= 2;
    },
    (value: number): boolean => {
      return value % 10 >= 5 || value % 10 === 0 || (value > 10 && value < 20);
    },
  ];

  constructor(public words: WordsList<RUWord> = new WordsList<RUWord>()) {
    super();
  }

  public pluralize(word: string, count: number, modifier?: RUModifier): string {
    return word + this.getEnding(count, this.getCaseVariations(word, modifier));
  }

  protected getCaseVariations(word: string, modifier?: RUModifier): string[] {
    const rawWord = this.words.get(word);
    return rawWord.cases[modifier ? modifier : Object.keys(rawWord.cases)[0]];
  }
}
```

You should provide file with config for pluralization (ruWords in example above) like this:

```json
{
  "билет": {
    "base": "билет",
    "cases": {
      "nominative": ["", "а", "ов"],
      "genitive": ["а", "ов", "ов"],
      "dative": ["у", "ам", "ам"],
      "accusative": ["", "а", "ов"],
      "instrumental": ["ом", "ами", "ами"],
      "prepositional": ["е", "ах", "ах"]
    }
  },
  "подразделение": {
    "base": "подразделени",
      "cases": {
        "nominative": ["е", "я", "й"],
        "genitive": ["я", "й", "й"],
        "dative": ["ю", "ям", "ям"],
        "accusative": ["е", "я", "й"],
        "instrumental": ["ем", "ями", "ями"],
        "prepositional": ["е", "ях", "ях"]
    }
  }
}
```   
this file can be of type json, js and ts. 

This Version implement next locales out of the box:

* EN - english
* RU - russian

All locales names written in two upper case letters notation.

Vue usage
---------

Use this package: [@new-inventor/vue-pluralization](https://github.com/new-inventor/vue-pluralization)

```shell script
npm install @new-inventor/vue-pluralization
``` 

in main.ts/js 

```typescript
import SmartPluralizationPlugin from '@new-inventor/vue-pluralization';
import {LocaleName, RUWord} from '@new-inventor/pluralization/locales';
import RU from '@new-inventor/pluralization/locales/RU';
import WordsList from '@new-inventor/pluralization/WordsList';
import ruWords from './ru.pluralization.json';
//...
Vue.use(SmartPluralizationPlugin, {currentLocale: 'RU', locales: {[LocaleName.RU]: new RU(new WordsList<RUWord>(ruWords))}});
```

in templates

```html
<div>{{ n }} {{'билет' | pluralize(1, 'nominative')}}</div>
<div>{{ '{n} {билет|nominative}' | pluralizeTemplate(1)}}</div>
```

in components

```typescript
this.$pluralizer.pluralize('билет', 1, RUModifier.DATIVE);
this.$pluralizer.pluralizeTemplate('{n} {билет|nominative}', 1);
```

Angular usage
-------------

use this package: [@new-inventor/angular-pluralization](https://github.com/new-inventor/angular-pluralization)

```shell script
npm install @new-inventor/angular-pluralization
``` 

import module

```typescript
@NgModule({
  imports:      [ SmartPluralizationModule ],
  // ...
})
```

inject in component or service

```typescript
import SmartPluralizationService from '@new-inventor/angular-pluralization/SmartPluralization.service';

class SomeClass{
  constructor(private pluralizationService: SmartPluralizationService){}
}
```

use in component

```typescript
this.pluralizationService.pluralize('билет', 1, RUModifier.DATIVE);
this.pluralizationService.pluralizeTemplate('{n} {билет|nominative}', 1);
```

use in templates

```html
<div>{{ n }} {{ 'билет' | pluralize:1:'nominative' }}</div>
<div>{{ '{n} {билет|nominative}' | pluralizeTemplate:1 }}</div>
```

Contribute
----------
Pull requests are always welcome.

Issues you can add here: https://github.com/new-inventor/smart_pluralization/issues

LICENCE
-------
MIT
