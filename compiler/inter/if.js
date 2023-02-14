import { Type } from "../symbols/type";
import { Stmt } from "./stmt";

export class If extends Stmt {
  expr;
  stmt;
  constructor(x, s) {
    this.expr = x;
    this.stmt = x;
    if (this.expr.type !== new Type().Bool)
      this.expr.error("boolean required in if");
  }
  gen(b, a) {
    let label = this.newlabel();
    this.expr.jumping(0, a);
    this.emitlabel(label);
    this.stmt.gen(label, a);
  }
}
