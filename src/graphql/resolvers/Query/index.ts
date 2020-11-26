import { getConnection } from "typeorm";
import User from "../../../entity/User";

export default {
  users: async () => {
    return await getConnection().manager.find(User);
  },
};
