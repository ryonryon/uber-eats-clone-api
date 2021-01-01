import { getConnection } from "typeorm";
import Customer from "../../../entities/Customer";
import Order from "../../../entities/Order";
import { decodeEntity } from "../../../utils/atob";

export default async (_: any, { id }: { id: string }) => {
  const connection = getConnection();

  const customer = await connection.manager.getRepository(Customer).findOne(id);
  if (!customer) throw new Error("the customer doesn't ");
  return await connection.manager
    .getRepository(Order)
    .findOne(decodeEntity(id));
};
