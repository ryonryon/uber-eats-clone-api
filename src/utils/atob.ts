export default function atob(str: string) {
  return Buffer.from(str, "base64").toString("utf-8");
}

export function decodeEntity(str: string): number {
  const _str = atob(str);

  // TODO use reger expression
  const decodedId = Number(_str.slice(_str.indexOf("|") + 1));
  if (isNaN(decodedId)) throw new Error("something wrong with decoding entity");

  return decodedId;
}
