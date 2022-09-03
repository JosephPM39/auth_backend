import { IsInt, IsDate, IsOptional } from 'class-validator';
import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
    id: number;

  @IsOptional()
  @Column()
  @IsDate()
    createAt: Date;

  @IsOptional()
  @Column()
  @IsDate()
    updateAt: Date;

  @IsOptional()
  @Column()
  @IsDate()
    deletedAt: Date;
}

export default { BaseModel };
