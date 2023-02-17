import { Tag } from "../lexer/tag.js";
import { Word } from "../lexer/word.js";

class TypeObj extends Word.Word {
  width = 0;
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

export const Type = {
  Type: TypeObj,
  Int: new TypeObj("int", Tag.BASIC, 4),
  Float: new TypeObj("float", Tag.BASIC, 8),
  Char: new TypeObj("char", Tag.BASIC, 1),
  Bool: new TypeObj("bool", Tag.BASIC, 1),
};
