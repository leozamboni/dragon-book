import { Node } from "./node";

export class Stmt extends Node {
  constructor() {}
  Null = new Stmt();
  gen(b, a) {}
  after = 0;
  Enclosing = new Stmt().Null;
}
