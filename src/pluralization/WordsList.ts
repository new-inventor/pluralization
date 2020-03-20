import {Dictionary} from './Dictionary';
import {Singleton} from '@/models/Singleton';
import {ObjectHelper, ObjectKey} from '@/helpers/ObjectHelper';
import {IRawWord, IWord} from './words/Word';
import {LocaleName, locales} from './Locales';


export interface IWordsList {
  load(words: { [index: string]: any }): void;
  add(wordName: string, word: IWord): void;
  remove(wordName: string): IWord;
  get(word: string): IWord;
}


export class WordsList extends Singleton implements IWordsList {
  private words: Dictionary<IWord> = new Dictionary<IWord>();

  constructor(readonly locale: LocaleName, words?: { [index: string]: any }) {
    super();
    if (words) {
      this.load(words);
    }
  }

  public load(words: { [index: string]: IRawWord }) {
    ObjectHelper.forEach(words, (word: IRawWord, key: ObjectKey) => {
      this.add(key as string, new locales[this.locale](word.base, new Dictionary(word.cases)));
    });
  }

  public add(wordName: string, word: IWord) {
    this.words.set(wordName, word);
  }

  public remove(wordName: string): IWord {
    const removingWord = this.words.get(wordName);
    this.words.remove(wordName);
    return removingWord;
  }

  public get(word: string): IWord {
    return this.words.get(word);
  }
}
