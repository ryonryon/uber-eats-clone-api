import { getConnection } from "typeorm";
import Customer from "../../../entities/Customer";
import MenuItem from "../../../entities/MenuItem";
import Order from "../../../entities/Order";
import OrderItem from "../../../entities/OrderItem";
import OrderStatus from "../../../entities/OrderStatus";
import Restaurant, { RestaurantId } from "../../../entities/Restaurant";
import { decodeEntity } from "../../../utils/atob";
import { Context } from "../../context";

interface InputType {
  restaurantId: string;
  items: {
    id: string;
    itemCount: number;
  }[];
  status: OrderStatus;
  note: string;
  address: string;
  tax: number;
  deliveryFee: number;
  tip: number;
}

export default async (
  _: any,
  {
    restaurantId,
    items,
    status,
    note,
    address,
    tax,
    deliveryFee,
    tip,
  }: InputType,
  { user }: Context
) => {
  const connection = getConnection();
  const _restaurantId = decodeEntity(restaurantId) as RestaurantId;

  const restaurant = connection.manager
    .getRepository(Restaurant)
    .findOne({ where: { id: _restaurantId } });

  if (!restaurant) throw new Error("the restaurant isn't exist");
  if (!user) throw new Error("the user isn't exist");

  const customer = await connection.manager
    .getRepository(Customer)
    .findOne(user.id);

  if (!customer) throw new Error("the user isn't customer");

  return await connection.transaction(async (transactionalEntityManager) => {
    const orderItems: OrderItem[] = [];
    for (let i = 0; i < items.length; i++) {
      const order = await getConnection()
        .manager.getRepository(MenuItem)
        .findOne(decodeEntity(items[i].id));

      if (order === undefined)
        throw new Error(`the order id:${items[i].id} is not exist`);

      const orderItem = new OrderItem();
      orderItem.name = order.name;
      orderItem.description = order.description;
      orderItem.price = order.price;
      orderItem.count = items[i].itemCount;

      await transactionalEntityManager.save(orderItem);

      orderItems.push(orderItem);
    }

    const order = new Order();
    order.restaurant = _restaurantId;
    order.status = status;
    order.orderedAt =
      status === OrderStatus.COMPLETED ? new Date().toISOString() : null;
    order.note = note;
    order.address = address;
    order.subtotal = orderItems.reduce(
      (sum, { price, count }) => sum + price * count,
      0
    );
    order.tax = tax;
    order.deliveryFee = deliveryFee;
    order.tip = tip;
    order.items = orderItems;
    order.customer = customer.id;

    return await transactionalEntityManager.save(order);
  });
};
