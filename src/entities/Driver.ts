import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import User, { UserId } from "./User";

@Entity()
export default class Driver {
  @PrimaryGeneratedColumn()
  id!: DriverId;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User | UserId;

  @Column({ type: "text" })
  firstName!: string;

  @Column({ type: "text" })
  lastName!: string;

  @Column({ type: "boolean" })
  isActive!: boolean;
}

export type DriverId = number & {
  _DriverIdBrand: never;
};
