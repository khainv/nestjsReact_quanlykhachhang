import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tblusers')
@Index('uk_use_code', ['use_code'], { unique: true }) //không cho phép 2 bản ghi cùng 1 code
@Index('idx_use_phone', ['use_phone'])
@Index('idx_use_status', ['use_status'])
@Index('idx_use_created_at', ['created_at'])
export class Users {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  use_code: string;

  @Column({
    type: 'varchar',
    length: 250,
  })
  use_name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  use_phone: string | null;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  use_email: string | null;

  // 0: Chưa xác định, 1: Nam, 2: Nữ
  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 0,
  })
  use_sex: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  use_birthday: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  use_img: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  use_address: string | null;
  // 1: Cá nhân, 2: Doanh nghiệp
  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 1,
  })
  use_type: number;

  // 0: Ngừng hoạt động, 1: Hoạt động,
  // 2: Tiềm năng, 3: Đã chuyển đổi
  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 1,
  })
  use_status: number;
  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 0,
  })
  use_delete: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  created_by: number | null;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  updated_by: number | null;

  @CreateDateColumn({
    type: 'datetime',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updated_at: Date;
}
