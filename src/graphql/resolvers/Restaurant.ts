import { encodeEntity } from "../../utils/btoa";
import Restaurant from "../../entities/Restaurant";
import { Context } from "../context";

export default {
  id: async (source: Restaurant, _: any) => {
    return encodeEntity(source.id, "restaurant");
  },
  menu: async (source: Restaurant, _: any, { dataLoaders }: Context) => {
    return await dataLoaders.getMenuItemsByRestaurantIds.load(source.id);
  },
};
