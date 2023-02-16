import { Logical } from "./logical.js";

export class Not extends Logical {
  constructor(tok, x1, x2) {
    super(tok, x1, x2);
  }
  jumping(t, f) {
    this.expr2.jumping(f, t);
  }
  toString() {
    return this.op.toString() + " " + this.expr2.toString();
  }
}
