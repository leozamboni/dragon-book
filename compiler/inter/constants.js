import { Num } from "../lexer/num.js";
import { Word } from "../lexer/word.js";
import { Type } from "../symbols/type.js";
import { Expr } from "./expr.js";

class ConstantsObj extends Expr {
  constructor(tok, p) {
    if (arguments.length < 2) {
      super(new Num(arguments[0]), Type.Int);
    } else {
      super(tok, p);
    }
  }
  jumping(t, f) {
    if (this === True && t !== 0) this.emit("goto L" + t);
    else if (this === this.False && f !== 0) this.emit("goto L" + f);
  }
}

export const Constants = {
  Constants: ConstantsObj,
  True: new ConstantsObj(Word.True, Type.Bool),
  False: new ConstantsObj(Word.False, Type.Bool),
};
