import { getConnection } from "typeorm";
import Restaurant from "../../../entities/Restaurant";
import RestaurantType from "../../../entities/RestaurantType";

export default async (
  _: any,
  {
    name,
    description,
    type,
    address,
    phone,
    rate,
  }: {
    name: string;
    description: string | null;
    type: RestaurantType;
    address: string;
    phone: number | null;
    rate: number | null;
  }
) => {
  const restaurant = new Restaurant();

  restaurant.name = name;
  restaurant.description = description || null;
  restaurant.type = type;
  restaurant.address = address;
  restaurant.phone = phone || null;
  restaurant.rate = rate || null;

  return await getConnection().manager.save(restaurant);
};
