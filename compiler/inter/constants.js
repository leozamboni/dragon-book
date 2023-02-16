import { Num } from "../lexer/num.js";
import { Word } from "../lexer/word.js";
import { Type } from "../symbols/type.js";
import { Expr } from "./expr.js";

export class Constants extends Expr {
  constructor(tok, p) {
    if (arguments.length < 2) {
      super(new Num(i), new Type().Int);
    } else {
      super(tok, p);
    }
  }
  True = new Constants(new Word().True, new Type().Bool);
  False = new Constants(new Word().False, new Type().Bool);
  jumping(t, f) {
    if (this === True && t !== 0) this.emit("goto L" + t);
    else if (this === this.False && f !== 0) this.emit("goto L" + f);
  }
}
