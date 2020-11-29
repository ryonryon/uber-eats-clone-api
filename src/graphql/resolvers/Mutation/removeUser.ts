import { getConnection } from "typeorm";
import User from "../../../entity/User";
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
