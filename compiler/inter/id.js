import { Expr } from "./expr";

export class Id extends Expr {
  offset;
  constructor(id, p, b) {
    super(id, p);
    this.offset = b;
  }
}
