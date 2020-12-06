import { getConnection } from "typeorm";
import Restaurant from "../../../entities/Restaurant";
import { decodeEntity } from "../../../utils/atob";

export default async (_: any, { id }: { id: string }) => {
  return await getConnection()
    .manager.getRepository(Restaurant)
    .findOne(decodeEntity(id));
};
