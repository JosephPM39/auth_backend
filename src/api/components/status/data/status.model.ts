import { IsString, Length } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../base/data';

export interface IStatusModel extends StatusModel {
}

@Entity()
export class StatusModel extends BaseModel {
  @IsString()
  @Length(1, 40)
  @Column('varchar', { length: 40 })
    name: string;
}
