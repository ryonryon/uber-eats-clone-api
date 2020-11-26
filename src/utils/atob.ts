export default function atob(str: string) {
  return Buffer.from(str, "base64").toString("utf-8");
}

export function decodeEntity(str: string) {
  const _str = atob(str);

  // TODO use reger expression
  return _str.slice(_str.indexOf("|") + 1);
}
