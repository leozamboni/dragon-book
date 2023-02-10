export class Env {
  table;
  prev;
  constructor(p) {
    this.table = new Map();
    this.prev = p;
  }
  put(w, i) {
    this.table.set(w, i);
  }
  get(w) {
    for (let e = this; e != null; e = e.prev) {
      const found = e.table.get(w);
      if (found) return found;
    }
    return null;
  }
}
