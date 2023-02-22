import { Stmt } from "./inter/index.js";
import { Lexer } from "./lexer/index.js";
import { Parser } from "./parser/index.js";

export let stmt = new Stmt();

class Main {
  constructor() {
    let lex = new Lexer();
    let parse = new Parser(lex);
    parse.program();
    console.log("\n");
  }
}
new Main();
