import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: UserId;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column({ type: "text", nullable: true })
  iconUrl!: string | null;

  @Column()
  address!: string;
}

export type UserId = number & {
  _UserId: never;
};
