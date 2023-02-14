import { Type } from "../symbols/type";
import { Stmt } from "./stmt";

export class SetElem extends Stmt {
  array;
  index;
  expr;
  constructor(x, y) {
    this.array = x.array;
    this.index = x.index;
    this.expr = y;
    if (this.check(x.type, this.expr.type) === null) this.error("type error");
  }
  check(p1, p2) {
    if (p1 instanceof Array || p2 instanceof Array) return null;
    else if (p1 === p2) return p2;
    else if (new Type().numeric(p1) && new Type().numeric(p2)) return p2;
    else return null;
  }
  gen(b, a) {
    let s1 = this.index.reduce().toString();
    let s2 = this.expr.reduce().toString();
    this.emit(this.array.toString() + " [ " + s1 + " ] = " + s2);
  }
}
