import { getConnection } from "typeorm";
import { encodeEntity } from "../../utils/btoa";
import MenuItem from "../../entities/MenuItem";
import Restaurant, { RestaurantId } from "../../entities/Restaurant";

export default {
  id: async (source: MenuItem, _: any) => {
    return encodeEntity(source.id, "menu-item");
  },
  restaurant: async (source: MenuItem, _: any) => {
    return getConnection()
      .manager.getRepository(Restaurant)
      .findOne(source.restaurant as RestaurantId);
  },
};
