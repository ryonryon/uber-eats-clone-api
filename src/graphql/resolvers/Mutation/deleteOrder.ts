import { getConnection } from "typeorm";
import Order, { OrderId } from "../../../entities/Order";
import { decodeEntity } from "../../../utils/atob";

export default async (
  _: any,
  {
    id,
  }: {
    id: string;
  }
) => {
  const connection = getConnection();
  const orderId = decodeEntity(id) as OrderId;

  const res = await connection.manager.getRepository(Order).delete(orderId);

  return res.affected !== null;
};
