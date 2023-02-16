import { Node } from "./node.js";

class StmtObj extends Node {
  constructor() {
    super();
  }
  gen(b, a) {}
  after = 0;
}

export const Stmt = {
  Stmt: StmtObj,
  Null: new StmtObj(),
  Enclosing: new StmtObj(),
};
