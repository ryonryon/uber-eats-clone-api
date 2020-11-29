import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import MenuItem from "./MenuItem";
import RestaurantType from "./RestaurantType";

@Entity()
export default class Restaurant {
  @PrimaryGeneratedColumn()
  id!: RestaurantId;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column()
  type!: RestaurantType;

  @Column()
  address!: string;

  @Column({ type: "float", nullable: true })
  phone!: number | null;

  @Column({ type: "integer", nullable: true })
  rate!: number | null;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.restaurant)
  @JoinColumn()
  menu?: MenuItem[];
}

export type RestaurantId = number & {
  _RestaurantId: never;
};
