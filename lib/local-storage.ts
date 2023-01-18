export function getStroageItem(item: string) {
  return localStorage.getItem(item);
}

export function removeStorageItem(item: string) {
  localStorage.removeItem(item);
}
