import { Type } from "../symbols/type.js";
import { Logical } from "./logical.js";

export class Rel extends Logical {
  constructor(tok, x1, x2) {
    super(tok, x1, x2);
  }
  check(p1, p2) {
    if (p1 instanceof Array || p2 instanceof Array) return null;
    else if (p1 === p2) return new Type().Bool;
    else return null;
  }
  jumping(t, f) {
    let a = this.expr1.reduce();
    let b = this.expr2.reduce();
    let test = a.toString() + " " + this.op.toString() + " " + b.toString();
    this.emitjumps(test, t, f);
  }
}
