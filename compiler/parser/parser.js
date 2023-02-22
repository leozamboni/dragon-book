import { stmt } from "../main.js";
import { Env, Type } from "../symbols/index.js";
import { Tag, Word, Token } from "../lexer/index.js";
import {
  Arith,
  Access,
  Constants,
  Seq,
  Not,
  Rel,
  And,
  Or,
  SetElem,
  Set,
  Break,
  Stmt,
  Do,
  While,
  Else,
  If,
  Id,
} from "../inter/index.js";

export class Parser {
  lex;
  look;
  top = null;
  used = 0;
  constructor(l) {
    this.lex = l;
    this.move();
  }
  move() {
    this.look = this.lex.scan();
  }
  error(s) {
    throw new Error("near line " + this.lex.line + ": " + s);
  }
  match(t) {
    if (this.look.tag === t) this.move();
    else this.error("syntax error");
  }
  program() {
    let s = this.block();
    let begin = s.newlabel();
    let after = s.newlabel();
    s.emitlabel(begin);
    s.gen(begin, after);
    s.emitlabel(after);
  }
  block() {
    this.match("{");
    let savedEnv = this.top;
    this.top = new Env(this.top);
    this.decls();
    let s = this.stmts();
    this.match("}");
    this.top = savedEnv;
    return s;
  }
  decls() {
    while (this.look.tag === Tag.BASIC) {
      let p = this.type();
      let tok = this.look;
      this.match(Tag.ID);
      this.match(";");
      let id = new Id(tok, p, this.used);
      this.top.put(tok, id);
      this.used = this.used + p.width;
    }
  }
  type() {
    let p = this.look;
    this.match(Tag.BASIC);
    if (this.look.tag !== "[") return p;
    else return this.dims(p);
  }
  dims(p) {
    this.match("[");
    let tok = this.look;
    this.match(Tag.NUM);
    this.match("]");
    if (this.look.tag === "[") p = this.dims(p);
    return new Array(tok.value, p);
  }
  stmts() {
    if (this.look.tag === "}") return Stmt.Null;
    else return new Seq(this.stmt(), this.stmts());
  }
  stmt() {
    let x, s, s1, s2, savedStmt;
    switch (this.look.tag) {
      case ";":
        this.move();
        return Stmt.Null;
      case Tag.IF:
        this.match(Tag.IF);
        this.match("(");
        x = this.bool();
        this.match(")");
        s1 = this.stmt();
        if (this.look.tag !== Tag.ELSE) return new If(x, s1);
        this.match(Tag.ELSE);
        s2 = this.stmt();
        return new Else(x, s1.s2);
      case Tag.WHILE:
        let whilenode = new While();
        savedStmt = stmt.Enclosing;
        stmt.Enclosing = whilenode;
        this.match(Tag.WHILE);
        this.match("(");
        x = this.bool();
        this.match(")");
        s1 = this.stmt();
        whilenode.init(x, s1);
        stmt.Enclosing = savedStmt;
        return whilenode;
      case Tag.DO:
        let donode = new Do();
        savedStmt = stmt.Enclosing;
        stmt.Enclosing = donode;
        this.match(Tag.DO);
        s1 = this.stmt();
        this.match(Tag.WHILE);
        this.match("(");
        x = this.bool();
        this.match(")");
        this.match(";");
        donode.init(s1, x);
        stmt.Enclosing = savedStmt;
        return donode;
      case Tag.BREAK:
        this.match(Tag.BREAK);
        this.match(";");
        return new Break();
      case "{":
        return this.block();
      default:
        return this.assign();
    }
  }
  assign() {
    let stmt;
    let t = this.look;
    this.match(Tag.ID);
    let id = this.top.get(t);
    if (id === null) this.error(t.toString() + " undeclared");
    if (this.look.tag === "=") {
      this.move();
      stmt = new Set(id, this.bool());
    } else {
      let x = this.offset(id);
      this.match("=");
      stmt = new SetElem(x, this.bool());
    }
    this.match(";");
    return stmt;
  }
  bool() {
    let x = this.join();
    while (this.look.tag === Tag.OR) {
      let tok = this.look;
      this.move();
      x = new Or(tok, x, this.join());
    }
    return x;
  }
  join() {
    let x = this.equality();
    while (this.look.tag === Tag.AND) {
      let tok = look;
      this.move();
      x = new And(tok, x, this.equality());
    }
    return x;
  }
  equality() {
    let x = this.rel();
    while (this.look.tag === Tag.EQ || this.look.tag === Tag.NE) {
      let tok = look;
      this.move();
      x = new Rel(tok, x, this.rel());
    }
    return x;
  }
  rel() {
    let x = this.expr();
    switch (this.look.tag) {
      case "<":
      case Tag.LE:
      case Tag.GE:
      case ">":
        let tok = this.look;
        this.move();
        return new Rel(tok, x, this.expr());
      default:
        return x;
    }
  }
  expr() {
    let x = this.term();
    while (this.look.tag === "+" || this.look.tag === "-") {
      let tok = this.look;
      this.move();
      x = new Arith(tok, x, this.term());
    }
    return x;
  }
  term() {
    let x = this.unary();
    while (this.look.tag === "*" || this.look.tag === "/") {
      let tok = look;
      this.move();
      x = new Arith(tok, x, this.unary());
    }
    return x;
  }
  unary() {
    if (this.look.tag === "-") {
      this.move();
      return new Unary(Word.minus, this.unary());
    } else if (this.look.tag === "!") {
      let tok = this.look;
      this.move();
      return new Not(tok, this.unary());
    } else return this.factor();
  }
  factor() {
    let x = null;
    switch (this.look.tag) {
      case "(":
        this.move();
        x = this.bool();
        this.match(")");
        return x;
      case Tag.NUM:
        x = new Constants.Constants(this.look, Type.Int);
        this.move();
        return x;
      case Tag.REAL:
        x = new Constants.Constants(this.look, Type.Float);
        this.move();
        return x;
      case Tag.TRUE:
        x = Constants.True;
        this.move();
        return x;
      case Tag.FALSE:
        x = Constants.False;
        this.move();
        return x;
      default:
        this.error("syntax error");
        return x;
      case Tag.ID:
        let s = this.look.toString();
        let id = this.top.get(this.look);
        if (id === null) this.error(this.look.toString() + " undeclared");
        this.move();
        if (this.look.tag !== "[") return id;
        else return this.offset(id);
    }
  }
  offset(a) {
    let i, w, t1, t2, loc;
    let type = a.type;
    this.match("[");
    i = this.bool();
    this.match("]");
    type = type[1];
    w = new Constants.Constants(type.width);
    t1 = new Arith(new Token("*"), i, w);
    loc = t1;
    while (this.look.tag === "[") {
      this.match("[");
      i = this.bool();
      this.match("]");
      // type = type.of;
      w = new Constants.Constants(type.width);
      t1 = new Arith(new Token("*"), i, w);
      t2 = new Arith(new Token("+"), i, w);
      loc = t2;
    }
    return new Access(a, loc, type);
  }
}
