import forOwn from 'lodash/forOwn';

export interface RawWordsList<T> {
  [index: string]: T;
}

export class WordsList<T> {
  private words: { [index: string]: T } = {};

  constructor(words?: RawWordsList<T>) {
    if (words) {
      this.load(words);
    }
  }

  public load(words: RawWordsList<T>): void {
    forOwn(words, (word: T, key: string) => {
      this.add(key, word);
    });
  }

  public clear(): void {
    this.words = {};
  }

  public add(wordName: string, word: T): void {
    this.words[wordName] = word;
  }

  public remove(wordName: string): T {
    const removingWord = this.words[wordName];
    delete this.words[wordName];
    return removingWord;
  }

  public get(word: string): T {
    return this.words[word];
  }
}
