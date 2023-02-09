class Env {
  table;
  prev;
  constructor(p) {
    this.table = new Map();
    this.prev = p;
  }
  put(s, sym) {
    this.table.set(s, sym);
  }
  get(s) {
    for (let e = this; e != null; e = e.prev) {
      let found = e.table.get(s);
      if (found) return found;
    }
    return null;
  }
}
const env = new Env();
env.put("abc", { lexeme: "abc" });
env.put("def", { lexeme: "def" });
console.log(env.get("def"));
