import { getConnection } from "typeorm";
import Order from "../../../entities/Order";
import OrderItem from "../../../entities/OrderItem";
import OrderStatus from "../../../entities/OrderStatus";
import Restaurant, { RestaurantId } from "../../../entities/Restaurant";
import { decodeEntity } from "../../../utils/atob";

interface InputType {
  restaurantId: string;
  items: {
    name: string;
    description: string;
    price: number;
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

  connection.transaction(async (transactionalEntityManager) => {
    const orderInput = new Order();
    orderInput.restaurant = _restaurantId;
    orderInput.status = status;
    orderInput.orderedAt =
      status === OrderStatus.COMPLETED ? new Date().toISOString() : null;
    orderInput.note = note;
    orderInput.address = address;
    orderInput.subtotal = items.reduce((sum, { price }) => sum + price, 0);
    orderInput.tax = tax;
    orderInput.deliveryFee = deliveryFee;
    orderInput.tip = tip;

    const order = await transactionalEntityManager.save(orderInput);

    items.forEach(async ({ name, description, price }) => {
      const orderItem = new OrderItem();
      orderItem.order = order.id;
      orderItem.name = name;
      orderItem.description = description;
      orderItem.price = price;

      await transactionalEntityManager.save(orderItem);
    });

    return order;
  });
};
