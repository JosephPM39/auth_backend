import { IsInt, IsDate } from 'class-validator';
import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
    id: number;

  @Column()
  @IsDate()
    createAt: Date;

  @Column()
  @IsDate()
    updateAt: Date;

  @Column()
  @IsDate()
    deletedAt: Date;
}

export default { BaseModel };
