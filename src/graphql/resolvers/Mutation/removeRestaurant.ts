import { getConnection } from "typeorm";
import Restaurant from "../../../entities/Restaurant";
import { decodeEntity } from "../../../utils/atob";

export default async (
  _: any,
  {
    restaurantId,
  }: {
    restaurantId: string;
  }
) => {
  return await getConnection()
    .manager.getRepository(Restaurant)
    .delete(decodeEntity(restaurantId));
};
