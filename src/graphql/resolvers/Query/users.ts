import { getConnection } from "typeorm";
import User from "../../../entities/User";

export default async () => {
  return await getConnection().manager.find(User);
};
