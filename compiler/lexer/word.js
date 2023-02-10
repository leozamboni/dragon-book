import { Token } from "./token.js";
import { Tag } from "./tag.js";

export class Word extends Token {
  lexeme = "";
  constructor(s, tag) {
    super(tag);
    this.lexeme = s;
  }
  toString() {
    return this.lexeme;
  }
  and = new Word("&&", Tag.AND);
  or = new Word("||", Tag.OR);
  eq = new Word("==", Tag.EQ);
  ne = new Word("!=", Tag.NE);
  le = new Word("<=", Tag.LE);
  ge = new Word(">=", Tag.GE);
  minus = new Word("minus", Tag.MINUS);
  True = new Word("true", Tag.TRUE);
  False = new Word("false", Tag.FALSE);
  temp = new Word("t", Tag.TEMP);
}
