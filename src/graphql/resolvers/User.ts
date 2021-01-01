import { getConnection } from "typeorm";
import { encodeEntity } from "../../utils/btoa";
import User from "../../entities/User";
import Customer from "../../entities/Customer";

export default {
  id: async (source: User, _: any) => {
    return encodeEntity(source.id, "user");
  },
  customer: async (source: User, _: any) => {
    return getConnection().manager.getRepository(Customer).findOne(source.id);
  },
};
