import { getConnection } from "typeorm";
import User from "../../../entities/User";
import { decodeEntity } from "../../../utils/atob";

export default async (_: any, { id }: { id: string }) => {
  return await getConnection()
    .manager.getRepository(User)
    .findOne(decodeEntity(id));
};
