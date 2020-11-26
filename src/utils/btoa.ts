export default function btoa(str: string) {
  return Buffer.from(str, "utf-8").toString("base64");
}

export function encodeEntity(id: number, entityName: string) {
  return btoa(`${entityName}|${id}`);
}
