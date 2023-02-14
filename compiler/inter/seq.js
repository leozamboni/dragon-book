import { Stmt } from "./stmt";

export class Seq extends Stmt {
  stmt1;
  stmt2;
  constructor(s1, s2) {
    this.stmt1 = s1;
    this.stmt2 = s2;
  }
  gen(b, a) {
    if (this.stmt1 === new Stmt().Null) this.stmt2.gen(b, a);
    else if (this.stmt2 === new Stmt().Null) this.stmt1.gen(b, a);
    else {
      let label = this.newlabel();
      this.stmt1.gen(b, label);
      this.emitlabel(label);
      this.stmt2.gen(label, a);
    }
  }
}
