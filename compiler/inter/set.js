import { Type } from "../symbols/type.js";
import { Stmt } from "./stmt.js";

export class Set extends Stmt.Stmt {
  id;
  stmt;
  constructor(i, x) {
    super();
    this.id = i;
    this.expr = x;
    if (this.check(this.id.type, this.expr.type) === null)
      this.error("type error");
  }
  check(p1, p2) {
    if (new Type.Type().numeric(p1) && new Type.Type().numeric(p2)) return p2;
    else if (p1 === Type.Bool && p2 === Type.Bool) return p2;
    else return null;
  }
  gen(b, a) {
    this.emit(this.id.toString() + " = " + this.expr.gen().toString());
  }
}
