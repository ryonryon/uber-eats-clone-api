import { getConnection } from "typeorm";
import { encodeEntity } from "../../utils/btoa";
import Order from "../../entities/Order";
import OrderItem from "../../entities/OrderItem";
import Restaurant from "../../entities/Restaurant";

export default {
  id: async (source: Order, _: any) => {
    return encodeEntity(source.id, "order");
  },
  items: async (source: Order, _: any) => {
    return getConnection()
      .manager.getRepository(OrderItem)
      .find({ where: { order: source.id } });
  },
  restaurant: async (source: Order, _: any) => {
    return getConnection()
      .manager.getRepository(Restaurant)
      .findOne(source.restaurant);
  },
};
