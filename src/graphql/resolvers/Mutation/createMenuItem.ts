import { getConnection } from "typeorm";
import MenuItem from "../../../entities/MenuItem";
import Restaurant, { RestaurantId } from "../../../entities/Restaurant";
import { decodeEntity } from "../../../utils/atob";

interface InputType {
  name: string;
  description: string | null;
  price: number;
  mediaUrl: string | null;
  restaurantId: string;
}

export default async (
  _: any,
  { name, description, price, mediaUrl, restaurantId }: InputType
) => {
  const connection = getConnection();
  const _restaurantId = decodeEntity(restaurantId) as RestaurantId;

  const restaurant = connection.manager
    .getRepository(Restaurant)
    .findOne({ where: { id: _restaurantId } });

  if (!restaurant) throw new Error("the restaurant isn't exist");

  const menuItem = new MenuItem();
  menuItem.name = name;
  menuItem.description = description || null;
  menuItem.price = price;
  menuItem.mediaUrl = mediaUrl || null;
  menuItem.restaurant = _restaurantId;

  return await getConnection().manager.save(menuItem);
};
