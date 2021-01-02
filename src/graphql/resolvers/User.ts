import { getConnection } from "typeorm";
import { encodeEntity } from "../../utils/btoa";
import Customer from "../../entities/Customer";
import Driver from "../../entities/Driver";
import User from "../../entities/User";

export default {
  id: async (source: User, _: any) => {
    return encodeEntity(source.id, "user");
  },
  customer: async (source: User, _: any) => {
    return getConnection()
      .manager.getRepository(Customer)
      .findOne({ where: { user: source.id } });
  },
  driver: async (source: User, _: any) => {
    return getConnection()
      .manager.getRepository(Driver)
      .findOne({ where: { user: source.id } });
  },
};
