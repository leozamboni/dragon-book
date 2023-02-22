import { Node } from "./node.js";

export class Stmt extends Node {
  static Null = new Stmt();
  static Enclosing = new Stmt();
  constructor() {
    super();
  }
  gen(b, a) {}
  after = 0;
}
