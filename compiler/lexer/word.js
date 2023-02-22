import { Token } from "./token.js";
import { Tag } from "./tag.js";

export class Word extends Token {
  static and = new Word("&&", Tag.AND);
  static or = new Word("||", Tag.OR);
  static eq = new Word("==", Tag.EQ);
  static ne = new Word("!=", Tag.NE);
  static le = new Word("<=", Tag.LE);
  static ge = new Word(">=", Tag.GE);
  static minus = new Word("minus", Tag.MINUS);
  static True = new Word("true", Tag.TRUE);
  static False = new Word("false", Tag.FALSE);
  static temp = new Word("t", Tag.TEMP);
  lexeme = "";
  constructor(s, tag) {
    super(tag);
    this.lexeme = s;
  }
  toString() {
    return this.lexeme;
  }
}
