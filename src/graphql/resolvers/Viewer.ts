import { getConnection } from "typeorm";
import { encodeEntity } from "../../utils/btoa";
import Order from "../../entities/Order";
import Restaurant from "../../entities/Restaurant";
import User from "../../entities/User";

export default {
  id: async (source: User, _: any) => {
    return encodeEntity(source.id, "user");
  },
  pastOrders: async (source: User, _: any) => {
    console.log("source", source);
    return await getConnection()
      .manager.getRepository(Order)
      .find({ where: { user: source.id } });
  },
  restaurants: async () => {
    return await getConnection().manager.find(Restaurant);
  },
};
