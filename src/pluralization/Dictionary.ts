import {ObjectHelper, ObjectKey} from '@/helpers/ObjectHelper';

export interface IDictionary<T> {
  readonly length: number;

  /**
   * Loads set of records
   * @param items
   */
  load(items: { [index: string]: T }): void;

  /**
   * Sets a key in dictionary
   * @param key
   * @param value
   */
  set(key: ObjectKey, value: T): Dictionary<T>;

  /**
   * Test key for existence
   * @param key
   */
  has(key: ObjectKey): boolean;

  /**
   * Gets key from dictionary
   * @param key
   */
  get(key: ObjectKey): T;

  /**
   * Returns key in specific index
   * @param index
   */
  getKeyByIndex(index: number): string | null;

  /**
   * Returns value in specific index
   * @param index
   */
  getByIndex(index: number): T | null;

  /**
   * Removes key from dictionary
   * @param key
   */
  remove(key: string): Dictionary<T>;

  /**
   * Returns dictionary names
   */
  keys(): ObjectKey[];

  /**
   * Returns array of dictionary values
   */
  values(): T[];

  /**
   * Removes all items from dictionary and resets counter.
   */
  removeAll(): void;

  /**
   * Iterates items one by one using the callback function. To break forEach return null from callback function.
   * @param callback
   */
  forEach(callback: (value: T, name: ObjectKey, index: number) => void): void;

  /**
   * Return first occurrence in dictionary that satisfy the callback function. In format {name: <name>, value: T}
   * @param callback
   */
  find(callback: (value: T, name: ObjectKey) => boolean): T | null;

  /**
   * Filters items in dictionary and returns new DictionaryInterface<T> with elements that satisfy the callback function
   *
   * @param callback - Must return true if element matched
   */
  filter(callback: (value: T, name: ObjectKey) => boolean): Dictionary<T>;
}

export class Dictionary<T> implements IDictionary<T> {
  protected items: { [index: string]: T } = {};
  // tslint:disable-next-line:variable-name
  protected _length = 0;

  constructor(values: {[index: string]: T} = {}) {
    this.load(values);
  }

  public load(items: { [index: string]: T }): void {
    if (items) {
      ObjectHelper.forEach(items, (condition: T, key: ObjectKey) => this.set(key, condition));
    }
  }

  public set(key: ObjectKey, value: T): Dictionary<T> {
    if (!this.items.hasOwnProperty(key)) {
      this._length++;
    }
    this.items[key] = value;

    return this as Dictionary<T>;
  }

  public has(key: ObjectKey): boolean {
    return this.items.hasOwnProperty(key);
  }

  public get length(): number {
    return this._length;
  }

  public get(key: ObjectKey): T {
    return this.items[key];
  }

  public getKeyByIndex(index: number): string | null {
    let i = -1;
    let res: ObjectKey | null = null;
    this.forEach((value: T, name: ObjectKey) => {
      if (++i === index) {
        res = name;
        return null;
      }
    });

    return res;
  }

  public getByIndex(index: number): T | null {
    let i = -1;
    let res = null;
    this.forEach((value: T) => {
      if (++i === index) {
        res = value;
        return null;
      }
    });

    return res;
  }

  public remove(key: string): Dictionary<T> {
    if (this.has(key)) {
      delete this.items[key];
      this._length--;
    }
    return this as Dictionary<T>;
  }

  public keys(): ObjectKey[] {
    const keySet: ObjectKey[] = [];
    ObjectHelper.forEach(this.items, (item: T, key: ObjectKey) => {
      keySet.push(key);
    });

    return keySet;
  }

  public values(): T[] {
    const values: T[] = [];
    ObjectHelper.forEach(this.items, (item: T) => {
      values.push(item);
    });

    return values;
  }

  public removeAll(): void {
    this.items = {};
    this._length = 0;
  }

  public forEach(callback: (value: T, name: ObjectKey, index: number) => void) {
    let i = 0;
    ObjectHelper.forEach(this.items, (item: T, key: ObjectKey) => {
      return callback(item, key, i++);
    });
  }

  public find(callback: (value: T, name: ObjectKey) => boolean): T | null {
    let res = null;
    ObjectHelper.forEach(this.items, (value: T, name: ObjectKey) => {
      if (callback(value, name)) {
        res = value;
        return null;
      }
    });
    return res;
  }

  public filter(callback: (value: T, name: ObjectKey) => boolean): Dictionary<T> {
    const res: { [index: string]: T } = {};
    this.forEach((value: T, name: ObjectKey) => {
      if (callback(value, name)) {
        res[name] = value;
      }
    });

    return new Dictionary(res);
  }
}
