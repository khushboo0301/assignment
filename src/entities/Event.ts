import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column()
  date!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by" })
  created_by!: User;

  @CreateDateColumn()
  created_at!: Date;
}
