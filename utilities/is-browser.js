export default function isBrowser(func) {
  return process.browser ? func : () => isBrowser(func);
}
