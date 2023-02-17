import { Stmt } from "./inter/stmt.js";
import { Lexer } from "./lexer/lexer.js";
import { Parser } from "./parser/parser.js";

export let stmt = new Stmt.Stmt();

class Main {
  constructor() {
    let lex = new Lexer();
    let parse = new Parser(lex);
    parse.program();
    console.log("\n");
  }
}
new Main();
