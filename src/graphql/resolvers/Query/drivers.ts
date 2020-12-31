import { getConnection } from "typeorm";
import User from "../../../entities/User";
import UserType from "../../../entities/UserType";

export default async () => {
  return await getConnection()
    .manager.getRepository(User)
    .find({ where: { type: UserType.DRIVER } });
};
