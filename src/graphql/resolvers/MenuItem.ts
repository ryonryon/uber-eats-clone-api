import { getConnection } from "typeorm";
import { encodeEntity } from "../../utils/btoa";
import MenuItem from "../../entity/MenuItem";
import Restaurant, { RestaurantId } from "../../entity/Restaurant";

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
