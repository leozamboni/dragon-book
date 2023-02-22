import { Expr } from "./expr.js";
import { Word } from "../lexer/word.js";

export class Temp extends Expr {
  static count = 0;
  number = 0;
  constructor(p) {
    super(Word.temp, p);
    this.number = ++Temp.count;
  }
  toString() {
    return "t" + this.number;
  }
}
