import { Tag, Word } from "../lexer/index.js";

export class Type extends Word {
  static Int = new Type("int", Tag.BASIC, 4);
  static Float = new Type("float", Tag.BASIC, 8);
  static Char = new Type("char", Tag.BASIC, 1);
  static Bool = new Type("bool", Tag.BASIC, 1);
  static width = 0;
  constructor(s, tag, w) {
    super(s, tag);
    this.width = w;
  }
  numeric(p) {
    if (p === Type.Char || p === Type.Int || p === Type.Float) return true;
    else return false;
  }
  max(p1, p2) {
    if (!this.numeric(p1) || !this.numeric(p2)) return null;
    else if (p1 === Type.Float || p2 === Type.Float) return Type.Float;
    else if (p1 === Type.Int || p2 === Type.Int) return Type.Int;
    else return Type.Char;
  }
}
