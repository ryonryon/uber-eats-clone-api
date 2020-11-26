import { getConnection } from "typeorm";
import User from "../../../entity/User";
import { decodeEntity } from "../../../utils/atob";

export default {
  users: async () => {
    return await getConnection().manager.find(User);
  },
  user: async (_: any, { id }: { id: string }) => {
    return await getConnection()
      .manager.getRepository(User)
      .findOne(decodeEntity(id));
  },
};
