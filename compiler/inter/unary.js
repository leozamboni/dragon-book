import { Op } from "./op";
import { Type } from "../symbols/type";

export class Unary extends Op {
  expr;
  constructor(tok, x) {
    super(tok, null);
    this.expr = x;
    this.type = new Type().max(new Type().Int, this.expr.type);
    if (this.type === null) console.error("type error");
  }
  gen() {
    return new Unary(this.op, this.expr.reduce());
  }
  toString() {
    return this.op.toString() + " " + this.expr.toString();
  }
}
