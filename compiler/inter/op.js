import { Expr } from "./expr";

export class Op extends Expr {
  constructor() {}
  reduce() {
    const x = this.gen();
    const t = new Temp(this.type);
    this.emit(t.toString() + " = " + x.toString());
    return t;
  }
}
