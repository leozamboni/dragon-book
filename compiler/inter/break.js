import { Stmt } from "./stmt.js";

export class Break extends Stmt.Stmt {
  stmt;
  constructor() {
    super();
    if (Stmt.Enclosing === null) this.error("unenclosed break");
    this.stmt = Stmt.Enclosing;
  }
  gen(b, a) {
    this.emit("goto L" + this.stmt.after);
  }
}
