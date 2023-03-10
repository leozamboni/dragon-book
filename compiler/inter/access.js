import { Tag } from "../lexer/tag.js";
import { Word } from "../lexer/word.js";
import { Op } from "./op.js";

export class Access extends Op {
  array;
  index;
  constructor(a, i, p) {
    super(new Word("[]", Tag.INDEX), p);
    this.array = a;
    this.index = i;
  }
  gen() {
    return new Access(this.array, this.index.reduce(), this.type);
  }
  jumping(t, f) {
    this.emitjumps(this.reduce().toString(), t, f);
  }
  toString() {
    return this.array.toString() + " [ " + this.index.toString() + " ]";
  }
}
