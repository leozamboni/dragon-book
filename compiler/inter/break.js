import { Stmt } from "./stmt.js";

export class Break extends Stmt.Stmt {
  stmt;
  constructor() {
    if (new Stmt().Enclosing === null) this.error("unenclosed break");
    this.stmt = new Stmt().Enclosing;
  }
  gen(b, a) {
    this.emit("goto L" + this.stmt.after);
  }
}
