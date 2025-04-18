import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string; // Use the '!' to assert the value will be initialized and set UUID

  @Column()
  name!: string; // Required name field

  @Column({ unique: true })
  email!: string; // Unique email field

  @Column({ nullable: true })
  mobile?: string; // Optional mobile field

  @CreateDateColumn()
  created_at!: Date;
}
