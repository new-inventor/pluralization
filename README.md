JavaScript Smart Pluralisation
==============================

This module provides extendable service for pluralize words.

Instead of `"zero | one | more"` notation, we provide endings notation.

For example in the Russian language we can provide next json lang file:

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

and then in the code do something like this `{{'{n} {билет|genitive}' | pluralizeTemplate(value)}}`
or this `{{value}} {{'билет' | pluralize(value, 'genitive')}}`

This paradigm make code cleaner and make pluralization config slimmer.

For instance for english you have no config file.

For Russian language you can write only needed cases.

You can extend pluralisation for another language.

Examples of Angular pipe, Vue plugins and pluralization config exist in examples folder of project.

After implementing needed classes and files you can immediately use pipes or filters.

You can use service methods straight from components or another services, just import or inject it.

In Vue components (if you use the example plugin) you can just call service like this `this.pluralizer.pluralize(...)`  


LICENCE
=======

MIT
