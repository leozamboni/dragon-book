import { Type } from "../symbols/type";
import { Stmt } from "./stmt";

export class Do extends Stmt {
  expr;
  stmt;
  constructor() {
    this.expr = null;
    this.stmt = null;
  }
  init(x, s) {
    this.expr = x;
    this.stmt = s;
    if (this.expr.type !== new Type().Bool)
      this.expr.error("boolean required in do");
  }
  gen(b, a) {
    this.after = a;
    let label = this.newlabel();
    this.stmt.gen(b, label);
    this.emitlabel(label);
    this.expr.jumping(b, 0);
  }
}
