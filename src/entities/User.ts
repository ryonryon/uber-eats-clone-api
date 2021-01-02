import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import Customer from "./Customer";
import Driver from "./Driver";

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

  @OneToOne(() => Customer)
  customer?: Customer;

  @OneToOne(() => Driver)
  driver?: Driver;

  @CreateDateColumn()
  readonly createdAt!: Date;
}

export type UserId = number & {
  _UserIdBrand: never;
};
