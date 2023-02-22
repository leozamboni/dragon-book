import { Lexer } from "../lexer/lexer.js";

let labels = 0; // temporary adaptation for static variable

export class Node {
  lexline = 0;
  constructor() {
    this.lexline = new Lexer().line;
  }
  error(s) {
    throw new Error("near line" + this.lexline + ": " + s);
  }
  newlabel() {
    return ++labels;
  }
  emitlabel(i) {
    console.log("L" + i + ":");
  }
  emit(s) {
    console.log("\t" + s);
  }
}
