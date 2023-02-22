import { Type } from "../symbols/type.js";
import { Stmt } from "./stmt.js";

export class If extends Stmt {
  expr;
  stmt;
  constructor(x, s) {
    super();
    this.expr = x;
    this.stmt = x;
    if (this.expr.type !== Type.Bool) this.expr.error("boolean required in if");
  }
  gen(b, a) {
    let label = this.newlabel();
    this.expr.jumping(0, a);
    this.emitlabel(label);
    this.stmt.gen(label, a);
  }
}
