import { Token } from "./token.js";
import { Tag } from "./tag.js";

class WordObj extends Token {
  lexeme = "";
  constructor(s, tag) {
    super(tag);
    this.lexeme = s;
  }
  toString() {
    return this.lexeme;
  }
}

export const Word = {
  Word: WordObj,
  and: new WordObj("&&", Tag.AND),
  or: new WordObj("||", Tag.OR),
  eq: new WordObj("==", Tag.EQ),
  ne: new WordObj("!=", Tag.NE),
  le: new WordObj("<=", Tag.LE),
  ge: new WordObj(">=", Tag.GE),
  minus: new WordObj("minus", Tag.MINUS),
  True: new WordObj("true", Tag.TRUE),
  False: new WordObj("false", Tag.FALSE),
  temp: new WordObj("t", Tag.TEMP),
};
