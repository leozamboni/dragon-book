import { Tag } from "../lexer/tag";
import { Word } from "../lexer/word";

export class Type extends Word {
  width = 0;
  constructor(s, tag, w) {
    super(s, tag);
    this.width = w;
  }
  Int = new Type("int", Tag.BASIC, 4);
  Float = new Type("float", Tag.BASIC, 8);
  Char = new Type("char", Tag.BASIC, 1);
  Bool = new Type("bool", Tag.BASIC, 1);
  numeric(p) {
    if (p === new Type().Char || p === new Type().Int || p === new Type().Float)
      return true;
    else return false;
  }
  max(p1, p2) {
    if (!this.numeric(p1) || !this.numeric(p2)) return null;
    else if (p1 === new Type().Float || p2 === new Type().Float)
      return new Type().Float;
    else if (p1 === new Type().Int || p2 === new Type().Int)
      return new Type().Int;
    else return new Type().Char;
  }
}
