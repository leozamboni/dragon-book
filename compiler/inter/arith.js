import { Op } from "./op.js";
import { Type } from "../symbols/type.js";

export class Arith extends Op {
  expr1;
  expr2;
  constructor(tok, x1, x2) {
    super(tok, null);
    this.expr1 = x1;
    this.expr2 = x2;
    this.type = new Type().max(this.expr1.type, this.expr2.type);
    if (this.type === null) this.error("type error");
  }
  gen() {
    return new Arith(this.op, this.expr1.reduce(), this.expr2.reduce());
  }
  toString() {
    return (
      this.expr1.toString() +
      " " +
      this.op.toString() +
      " " +
      this.expr2.toString()
    );
  }
}
