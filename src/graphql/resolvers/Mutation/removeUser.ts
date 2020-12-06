import { getConnection } from "typeorm";
import User from "../../../entities/User";
import { decodeEntity } from "../../../utils/atob";

export default async (
  _: any,
  {
    userId,
  }: {
    userId: string;
  }
) => {
  return await getConnection()
    .manager.getRepository(User)
    .delete(decodeEntity(userId));
};
