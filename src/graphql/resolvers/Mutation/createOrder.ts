import { getConnection } from "typeorm";
import MenuItem from "../../../entities/MenuItem";
import Order from "../../../entities/Order";
import OrderItem from "../../../entities/OrderItem";
import OrderStatus from "../../../entities/OrderStatus";
import Restaurant, { RestaurantId } from "../../../entities/Restaurant";
import { decodeEntity } from "../../../utils/atob";

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
  }: InputType
) => {
  const connection = getConnection();
  const _restaurantId = decodeEntity(restaurantId) as RestaurantId;

  const restaurant = connection.manager
    .getRepository(Restaurant)
    .findOne({ where: { id: _restaurantId } });

  if (!restaurant) throw new Error("the restaurant isn't exist");

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

    const orderInput = new Order();
    orderInput.restaurant = _restaurantId;
    orderInput.status = status;
    orderInput.orderedAt =
      status === OrderStatus.COMPLETED ? new Date().toISOString() : null;
    orderInput.note = note;
    orderInput.address = address;
    orderInput.subtotal = orderItems.reduce(
      (sum, { price, count }) => sum + price * count,
      0
    );
    orderInput.tax = tax;
    orderInput.deliveryFee = deliveryFee;
    orderInput.tip = tip;
    orderInput.items = orderItems;

    const order = await transactionalEntityManager.save(orderInput);

    return order;
  });
};
