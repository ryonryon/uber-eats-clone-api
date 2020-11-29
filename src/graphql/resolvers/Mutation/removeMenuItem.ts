import { getConnection } from "typeorm";
import MenuItem from "../../../entity/MenuItem";
import { decodeEntity } from "../../../utils/atob";

export default async (
  _: any,
  {
    menuItemId,
  }: {
    menuItemId: string;
  }
) => {
  return await getConnection()
    .manager.getRepository(MenuItem)
    .delete(decodeEntity(menuItemId));
};
