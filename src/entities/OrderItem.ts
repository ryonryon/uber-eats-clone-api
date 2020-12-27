import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Order, { OrderId } from "./Order";

@Entity()
export default class OrderItem {
  @PrimaryGeneratedColumn()
  id!: OrderItemId;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "float" })
  price!: number;

  @Column({ type: "int" })
  count!: number;

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  order!: Order | OrderId;
}

export type OrderItemId = number & {
  _OrderIdBrand: never;
};
