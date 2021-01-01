import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import User from "./User";

@Entity()
export default class Driver {
  @PrimaryGeneratedColumn()
  id!: DriverId;

  @OneToOne(() => User)
  user!: User;

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
