/* 
  node 2-27.m.js 1+1

  [pt-br] Figura 2.27 Programa JavaScript para traduzir expressões infixadas para a forma pós-fixada 
  [en] Figure 2.27: JavaScript program to translate infix expressions into postfix form
*/
class Parser {
  static lookahead;
  constructor() {
    this.index = 0;
    this.input = process.argv[2];
    this.lookahead = this.input[this.index++];
  }
  expr() {
    this.term();
    while (true) {
      if (this.lookahead === "+") {
        this.match("+");
        this.term();
        console.log("+");
      } else if (this.lookahead === "-") {
        this.match("-");
        this.term();
        console.log("-");
      } else {
        return;
      }
    }
  }
  term() {
    if (/[0-9]/.test(this.lookahead)) {
      console.log(this.lookahead);
      this.match(this.lookahead);
    }
  }
  match(t) {
    if (this.lookahead === t) {
      this.lookahead = this.input[this.index++];
    } else {
      throw new Error("syntax error");
    }
  }
}
class Postfix {
  main() {
    const parse = new Parser();
    parse.expr();
  }
}
new Postfix().main();
