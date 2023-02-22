import { Num } from "../lexer/num.js";
import { Word } from "../lexer/word.js";
import { Type } from "../symbols/type.js";
import { Expr } from "./expr.js";

export class Constants extends Expr {
  static True = new Constants(Word.True, Type.Bool);
  static False = new Constants(Word.False, Type.Bool);
  constructor(tok, p) {
    if (arguments.length < 2) {
      super(new Num(arguments[0]), Type.Int);
    } else {
      super(tok, p);
    }
  }
  jumping(t, f) {
    if (this === Constants.True && t !== 0) this.emit("goto L" + t);
    else if (this === Constants.False && f !== 0) this.emit("goto L" + f);
  }
}
