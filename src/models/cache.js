class Cache {
  constructor(size) {
      this.size = size;
      this.cache = new Map();
  }

  get(key) {
      if (this.cache.has(key)) {
          return this.cache.get(key);
      }
      return null;
  }

  set(key, value) {
      if (this.cache.size >= this.size) {
          const firstKey = this.cache.keys().next().value;
          this.cache.delete(firstKey);
      }
      this.cache.set(key, value);
  }

  clear() {
      this.cache.clear();
  }

  resize(newSize) {
      this.size = newSize;
      while (this.cache.size > newSize) {
          const firstKey = this.cache.keys().next().value;
          this.cache.delete(firstKey);
      }
  }
}

module.exports = Cache;
