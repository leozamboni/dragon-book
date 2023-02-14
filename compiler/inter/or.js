import { Logical } from "./logical";

export class Or extends Logical {
  constructor(tok, x1, x2) {
    super(tok, x1, x2);
  }
  jumping(t, f) {
    let label = t !== 0 ? t : this.newlabel();
    this.expr1.jumping(label, 0);
    this.expr2.jumping(t, f);
    if (t === 0) this.emitlabel(label);
  }
}
