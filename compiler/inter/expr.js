import { Node } from "./node.js";

export class Expr extends Node {
  op;
  type;
  constructor(tok, p) {
    this.op = tok;
    this.type = p;
  }
  gen() {
    return this;
  }
  reduce() {
    return this;
  }
  jumping(t, f) {
    this.emitjumps(toString(), t, f);
  }
  emitjumps(test, t, f) {
    if (t !== 0 && f !== 0) {
      this.emit(`if ${test} goto L${t}`);
      this.emit(`goto L${f}`);
    } else if (t !== 0) this.emit(`if ${test} goto L${t}`);
    else if (f !== 0) this.emit(`iffalse ${test} goto L${f}`);
    else;
  }
  toString() {
    return this.op.toString();
  }
}
