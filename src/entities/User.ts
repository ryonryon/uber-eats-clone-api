import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import Order from "./Order";
import UserType from "./UserType";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: UserId;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  email!: string | null;

  @Column({ type: "text", unique: true })
  authenticationId!: string;

  @Column({ type: "text" })
  profileImageURL!: string;

  @Column({ type: "boolean" })
  registered!: boolean;

  @Column({ type: "character varying", nullable: true })
  type?: UserType | null;

  @Column({ type: "text", nullable: true })
  address!: string | null;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @OneToMany(() => Order, (order) => order.user)
  pastOrders!: Order[];
}

export type UserId = number & {
  _UserIdBrand: never;
};
