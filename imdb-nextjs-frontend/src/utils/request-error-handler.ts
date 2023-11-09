export function findMessage(obj: Record<string, any>): any | undefined {
  for (const key in obj) {
    if (key === "message") {
      return obj[key];
    } else if (typeof obj[key] === "object") {
      const result = findMessage(obj[key]);
      if (result !== undefined) {
        return result;
      }
    }
  }
  return undefined;
}
