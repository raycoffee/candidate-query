class SearchCache {
  constructor() {
    this.cache = new Map();
    this.timeout = 60 * 60 * 1000; // 1 hour
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.timeout) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
}

export const searchCache = new SearchCache();