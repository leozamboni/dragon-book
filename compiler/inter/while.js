import { Type } from "../symbols/type";
import { Stmt } from "./stmt";

export class While extends Stmt {
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
      this.expr.error("boolean required in while");
  }
  gen(b, a) {
    this.after = a;
    this.expr.jumping(0, a);
    let label = this.newlabel();
    this.emitlabel(label);
    this.stmt.gen(label, a);
    this.emit("goto L" + b);
  }
}
