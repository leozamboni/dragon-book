import { Type } from "../symbols/type.js";
import { Stmt } from "./stmt.js";

export class Do extends Stmt {
  expr;
  stmt;
  constructor() {
    super();
    this.expr = null;
    this.stmt = null;
  }
  init(s, x) {
    this.expr = x;
    this.stmt = s;
    if (this.expr.type !== Type.Bool) this.expr.error("boolean required in do");
  }
  gen(b, a) {
    this.after = a;
    let label = this.newlabel();
    this.stmt.gen(b, label);
    this.emitlabel(label);
    this.expr.jumping(b, 0);
  }
}
