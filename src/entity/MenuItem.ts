import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Restaurant, { RestaurantId } from "./Restaurant";

@Entity()
export default class MenuItem {
  @PrimaryGeneratedColumn()
  id!: MenuItemId;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "float" })
  price!: number;

  @Column({ type: "text", nullable: true })
  mediaUrl!: string | null;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  restaurant!: Restaurant | RestaurantId;
}

export type MenuItemId = number & {
  _MenuItemId: never;
};
