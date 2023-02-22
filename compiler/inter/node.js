import { Lexer } from "../lexer/lexer.js";

export class Node {
  lexline = 0;
  constructor() {
    this.lexline = new Lexer().line;
  }
  error(s) {
    throw new Error("near line" + this.lexline + ": " + s);
  }
  static labels = 0;
  newlabel() {
    return ++Node.labels;
  }
  emitlabel(i) {
    console.log("L" + i + ":");
  }
  emit(s) {
    console.log("\t" + s);
  }
}
