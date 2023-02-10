import { Token } from "./token.js";
import { Tag } from "./tag.js";

export class Real extends Token {
  value;
  constructor(v) {
    super(Tag.REAL);
    this.value = v;
  }
  toString() {
    this.value.toString();
  }
}
