import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Order from "./Order";
import User, { UserId } from "./User";

@Entity()
export default class Customer {
  @PrimaryGeneratedColumn()
  id!: CustomerId;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User | UserId;

  @Column({ type: "text" })
  firstName!: string;

  @Column({ type: "text" })
  lastName!: string;

  @Column({ type: "text", nullable: true })
  address!: string | null;

  @OneToMany(() => Order, (order) => order.customer)
  pastOrders!: Order[];
}

export type CustomerId = number & {
  _CustomerIdBrand: never;
};
