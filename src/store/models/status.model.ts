import { IsString, Length } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.model';

@Entity()
export class Status extends BaseModel {
  @IsString()
  @Length(1, 40)
  @Column('varchar', { length: 40 })
    name: string;
}
