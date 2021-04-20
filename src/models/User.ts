import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: string;

  @Column({ default: false })
  isDeleted!: boolean;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
