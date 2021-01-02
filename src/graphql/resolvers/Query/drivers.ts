import { getConnection } from "typeorm";
import Driver from "../../../entities/Driver";

export default async () => {
  return await getConnection().manager.getRepository(Driver).find();
};
