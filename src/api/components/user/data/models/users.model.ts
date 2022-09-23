import {
  IsEmail,
  IsString,
  Length,
  IsDate,
  MaxLength,
} from 'class-validator';
import {
  Entity, Column, ManyToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import {
  StatusModel,
} from '../../..';
import {
  BaseModel,
} from '../../../base/data';

@Entity()
@Exclude()
export class UserModel extends BaseModel {
  @Expose()
  @Length(1, 80)
  @IsString()
  @Column('varchar', { length: 80 })
    name: string;

  @Expose()
  @Length(1, 20)
  @IsString()
  @Column('varchar', { length: 20 })
    nickName: string;

  @Expose()
  @Length(1, 20)
  @IsString()
  @Column('varchar', { length: 255 })
    pass: string;

  @Expose()
  @IsEmail()
  @Length(5, 60)
  @Column('varchar', { length: 60, unique: true })
    email: string;

  @Expose()
  @IsDate()
  @Column()
    dateUp: Date;

  @Expose()
  @MaxLength(255)
  @IsString()
  @Column('varchar', { length: 255 })
    recoveryToken: string;

  @Expose()
  @ManyToOne(() => StatusModel, (status) => status.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
    status: StatusModel;
}

export interface IUserModel extends UserModel{
}

export default { UserModel };
