import { getConnection } from "typeorm";
import Order from "../../../entities/Order";
import { decodeEntity } from "../../../utils/atob";

export default async (_: any, { id }: { id: string }) => {
  return await getConnection()
    .manager.getRepository(Order)
    .findOne(decodeEntity(id));
};
