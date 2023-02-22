import { Lexer } from "../lexer/lexer.js";

export class Node {
  lexline = 0;
  constructor() {
    this.lexline = new Lexer().line;
  }
  error(s) {
    throw new Error(`near line ${this.lexline}: ${s}`);
  }
  labels = 0;
  newlabel() {
    return ++this.labels;
  }
  emitlabel(i) {
    console.log(`L${i}:`);
  }
  emit(s) {
    console.log(`\t${s}:`);
  }
}
