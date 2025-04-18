import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Event } from "./Event";

@Entity("attendees")
export class Attendee {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Event)
  event!: Event; // connect to event

  @ManyToOne(() => User)
  user!: User; //connect to attendee users

  @CreateDateColumn()
  joined_at!: Date;
}
