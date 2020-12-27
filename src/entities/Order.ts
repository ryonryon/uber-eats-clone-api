import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import OrderStatus from "./OrderStatus";
import OrderItem from "./OrderItem";
import { RestaurantId } from "./Restaurant";
import User, { UserId } from "./User";

@Entity()
export default class Order {
  @PrimaryGeneratedColumn()
  id!: OrderId;

  @ManyToOne(() => User, (user) => user.pastOrders)
  user!: User | UserId;

  @Column()
  restaurant!: RestaurantId;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.order)
  @JoinColumn()
  items?: OrderItem[];

  @Column()
  status!: OrderStatus;

  @Column({ type: "text", nullable: true })
  note!: string | null;

  @Column()
  address!: string;

  @Column({ type: "timestamp with time zone", nullable: true })
  orderedAt!: string | null;

  @Column({ type: "float" })
  subtotal!: number;

  @Column({ type: "float" })
  tax!: number;

  @Column({ type: "float" })
  deliveryFee!: number;

  @Column({ type: "float" })
  tip!: number;
}

export type OrderId = number & {
  _OrderIdBrand: never;
};
