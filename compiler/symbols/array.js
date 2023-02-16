import { Tag } from "../lexer/tag.js";

export class Array extends Type {
  of;
  size = 1;
  constructor(sz, p) {
    super("[]", Tag.INDEX, sz * p.width);
    this.size = sz;
    this.of = p;
  }
  toString() {
    return `[${this.size}] ${this.of.toString()}`;
  }
}
