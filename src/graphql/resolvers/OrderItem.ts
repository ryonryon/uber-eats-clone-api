import { encodeEntity } from "../../utils/btoa";
import OrderItem from "../../entities/OrderItem";

export default {
  id: async (source: OrderItem, _: any) => {
    return encodeEntity(source.id, "order-item");
  },
};
