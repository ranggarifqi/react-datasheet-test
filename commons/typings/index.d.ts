declare interface Dict<T> {
  [k: string]: T
}
declare type ValueOf<T extends Dict<string | number>> = T[keyof T]
