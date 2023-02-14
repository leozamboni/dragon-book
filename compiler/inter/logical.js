import { Type } from "../symbols/type";
import { Expr } from "./expr";
import { Temp } from "./temp";

export class Logical extends Expr {
  expr1;
  expr2;
  constructor(tok, x1, x2) {
    super(tok, null);
    this.expr1 = x1;
    this.expr2 = x2;
    this.type = this.check(this.expr1.type, this.expr2.type);
    if (this.type === null) this.error("type error");
  }
  check(p1, p2) {
    if (p1 === new Type().Bool && p2 === new Type().Bool)
      return new Type().Bool;
    else return null;
  }
  Expr() {
    let f = this.newlabel();
    let a = this.newlabel();
    let temp = new Temp(this.type);
    this.jumping(0, f);
    this.emit(temp.toString() + " = true");
    this.emit("goto L" + a);
    this.emitlabel(f);
    this.emit(temp.toString() + " = false");
    this.emitlabel(a);
    return temp;
  }
  toString() {
    return (
      this.expr1.toString() +
      " " +
      this.op.toString() +
      " " +
      this.expr2.toString()
    );
  }
}
