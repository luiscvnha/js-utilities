export function delayed(callback: () => void, ms: number): () => void {
  let id: any;
  return () => {
    globalThis.clearTimeout(id);
    id = globalThis.setTimeout(callback, ms);
  };
}
