import { Token } from "./token.js";
import { Tag } from "./tag.js";

export class Num extends Token {
  value;
  constructor(v) {
    super(Tag.NUM);
    this.value = v;
  }
  toString() {
    return this.value.toString();
  }
}
