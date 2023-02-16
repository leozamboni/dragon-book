import { Type } from "../symbols/type.js";
import { Stmt } from "./stmt.js";

export class Else extends Stmt.Stmt {
  expr;
  stmt1;
  stmt2;
  constructor(x, s1, s2) {
    this.expr = x;
    this.stmt1 = s1;
    this.stmt2 = s2;
    if (this.expr.type !== new Type().Bool)
      this.expr.error("boolean required in if");
  }
  gen(b, a) {
    let label1 = this.newlabel();
    let label2 = this.newlabel();
    this.expr.jumping(0, label2);
    this.emitlabel(label1);
    this.stmt1.gen(label1, a);
    this.emit("goto L" + a);
    this.emitlabel(label2);
    this.stmt2.gen(label2, a);
  }
}
