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
import {
  BaseModel,
} from './base.model';
import {
  Status,
} from './status.model';

@Entity()
export class User extends BaseModel {
  @Length(1, 80)
  @IsString()
  @Column('varchar', { length: 80 })
    name: string;

  @Length(1, 20)
  @IsString()
  @Column('varchar', { length: 20 })
    nickName: string;

  @Length(1, 20)
  @IsString()
  @Column('varchar', { length: 255 })
    pass: string;

  @IsEmail()
  @Length(5, 60)
  @Column('varchar', { length: 60, unique: true })
    email: string;

  @IsDate()
  @Column()
    dateUp: Date;

  @MaxLength(255)
  @IsString()
  @Column('varchar', { length: 255 })
    recoveryToken: string;

  @ManyToOne(() => Status, (status) => status.id)
    status: Status;
}

export default { User };
