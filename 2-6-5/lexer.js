import { Word } from "./word.js";
import { Tag } from "./tag.js";
import { Num } from "./num.js";
import { Token } from "./token.js";

class Lexer {
  line = 1;
  peek = " ";
  words = [];
  index = 0;
  reserve(t) {
    this.words.push(t);
  }
  constructor() {
    this.reserve(new Word(Tag.TRUE, "true"));
    this.reserve(new Word(Tag.FALSE, "false"));
  }
  scan() {
    for (; ; this.peek = process.argv[2][this.index++]) {
      if (this.peek === " " || this.peek === "\t") continue;
      else if (this.peek === "\n") this.line++;
      else break;
    }
    if (/[0-9]/.test(this.peek)) {
      let v = 0;
      do {
        v = 10 * v + parseInt(this.peek);
        this.peek = process.argv[2][this.index++];
      } while (/[0-9]/.test(this.peek));
      return new Num(v);
    }
    if (this.peek && /[a-zA-Z]/.test(this.peek)) {
      let s = "";
      do {
        s += this.peek;
        this.peek = process.argv[2][this.index++];
      } while (this.peek && /[a-zA-Z0-9]/.test(this.peek));
      return new Word(Tag.ID, s);
    }
    let t = new Token(this.peek);
    this.peek = " ";
    return t;
  }
}

const lexer = new Lexer();
while (lexer.index < process.argv[2].length) {
  console.log(lexer.scan());
}
