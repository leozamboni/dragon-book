import { Token } from "./token.js";

export class Word extends Token {
  lexeme;
  constructor(t, s) {
    super(t);
    this.lexeme = s;
  }
}
