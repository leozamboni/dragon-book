import { Num } from "../lexer/num";
import { Word } from "../lexer/word";
import { Type } from "../symbols/type";
import { Expr } from "./expr";

export class Constants extends Expr {
  constructor(tok, p) {
    super(tok, p);
  }
  constructor(i) {
    super(new Num(i), new Type().Int)
  }
  True = new Constants(new Word().True, new Type().Bool)
  False = new Constants(new Word().False, new Type().Bool)
  jumping(t, f) {
    if (this === True && t !== 0) this.emit("goto L" + t)
    else if (this === this.False && f !== 0) this.emit("goto L" + f)
  }
}
