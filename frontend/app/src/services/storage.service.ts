// Chrome API types
declare global {
  interface Window {
    chrome?: any;
  }
}

interface StorageServiceInterface {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

class LocalStorageService implements StorageServiceInterface {
  async get(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }
  async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }
  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
  async clear(): Promise<void> {
    localStorage.clear();
  }
}

class ChromeStorageService implements StorageServiceInterface {
  async get(key: string): Promise<string | null> {
    const result = await window.chrome.storage.local.get(key);
    return result[key] || null;
  }
  async set(key: string, value: string): Promise<void> {
    window.chrome.storage.local.set({ [key]: value });
  }
  async remove(key: string): Promise<void> {
    window.chrome.storage.local.remove(key);
  }
  async clear(): Promise<void> {
    window.chrome.storage.local.clear();
  }
}

export default class StorageService {
  private storage: StorageServiceInterface;

  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    const isExtension = urlParams.get("extension") === "true";
    console.log(
      "🚀 ~ StorageService ~ constructor ~ isExtension:",
      isExtension
    );
    this.storage = isExtension
      ? new ChromeStorageService()
      : new LocalStorageService();
  }

  get(key: string) {
    return this.storage.get(key);
  }
  set(key: string, value: string) {
    return this.storage.set(key, value);
  }
  remove(key: string) {
    return this.storage.remove(key);
  }
  clear() {
    return this.storage.clear();
  }
}
