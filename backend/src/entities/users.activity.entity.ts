import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Users } from './users.entity.js';
import { Admin } from './admin.entity.js';

@Entity('tblusers_activities')
@Index('idx_user_activities_use_id', ['use_id'])
@Index('idx_user_activities_created_at', ['created_at'])
export class UsersActivityk {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ManyToOne(() => Users, (usersk) => usersk.userActivities)
  @JoinColumn({ name: 'use_id', referencedColumnName: 'id' })
  userk!: Relation<Users>;

  @ManyToOne(() => Admin, { nullable: false })
  @JoinColumn({ name: 'adm_id', referencedColumnName: 'id' })
  admink!: Relation<Admin>;

  @Column({ type: 'int', unsigned: true })
  use_id: number;

  @Column({ type: 'text' })
  act_name: string;

  @Column({ type: 'text' })
  act_des: string;

  @Column({ type: 'int', unsigned: true })
  adm_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
