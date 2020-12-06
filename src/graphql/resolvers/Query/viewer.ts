import { getConnection } from "typeorm";
import User from "../../../entities/User";
import { Context } from "../../context";

export default async (_: any, __: any, { user }: Context) => {
  return await getConnection().manager.getRepository(User).findOne(user!.id);
};
