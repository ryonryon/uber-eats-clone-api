import { getConnection } from "typeorm";
import Order, { OrderId } from "../../../entities/Order";
import OrderStatus from "../../../entities/OrderStatus";
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

  const order = await connection.manager
    .getRepository(Order)
    .findOne({ where: { id: orderId } });

  if (!order) throw new Error("the order isn't exist");

  order.status = OrderStatus.COMPLETED;

  return await getConnection().manager.save(order);
};
