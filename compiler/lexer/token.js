export class Token {
  tag;
  constructor(t) {
    this.tag = t;
  }
  toString() {
    return this.tag.toString();
  }
}
