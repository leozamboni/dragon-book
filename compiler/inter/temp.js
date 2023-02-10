import { Expr } from "./expr";
import { Word } from "../lexer/word";

export class Temp extends Expr {
  count = 0;
  number = 0;
  constructor(p) {
    super(new Word().temp, p);
    this.number = ++this.count;
  }
  toString() {
    return "t" + this.number;
  }
}
