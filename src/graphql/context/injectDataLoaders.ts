import DataLoader from "dataloader";
import { FastifyRequest } from "fastify";
import { getConnection } from "typeorm";
import { RestaurantId } from "../../entity/Restaurant";
import MenuItem from "../../entity/MenuItem";

export interface DataLoaders {
  getMenuItemsByRestaurantIds: DataLoader<RestaurantId, MenuItem[]>;
}

export default async (_: FastifyRequest, context: any): Promise<any> => {
  const dataLoaders: DataLoaders = {
    getMenuItemsByRestaurantIds: new DataLoader((restaurantIds) =>
      Promise.all(
        restaurantIds.map((restaurant) =>
          getConnection()
            .getRepository(MenuItem)
            .find({ where: { restaurant }, order: { id: "ASC" } })
        )
      )
    ),
  };

  return { ...context, dataLoaders };
};
