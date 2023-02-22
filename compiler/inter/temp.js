import { Expr } from "./expr.js";
import { Word } from "../lexer/word.js";

let count = 0; // temporary adaptation for static variable

export class Temp extends Expr {
  number = 0;
  constructor(p) {
    super(Word.temp, p);
    this.number = ++count;
  }
  toString() {
    return "t" + this.number;
  }
}
