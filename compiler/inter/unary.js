import { Op } from "./op.js";
import { Type } from "../symbols/type.js";

export class Unary extends Op {
  expr;
  constructor(tok, x) {
    super(tok, null);
    this.expr = x;
    this.type = new Type.Type().max(Type.Int, this.expr.type);
    if (this.type === null) this.error("type error");
  }
  gen() {
    return new Unary(this.op, this.expr.reduce());
  }
  toString() {
    return this.op.toString() + " " + this.expr.toString();
  }
}
