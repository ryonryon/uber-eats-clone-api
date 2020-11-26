import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class Book {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;
}
