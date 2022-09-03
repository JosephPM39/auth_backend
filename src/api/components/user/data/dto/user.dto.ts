/* eslint-disable max-classes-per-file */
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsEmpty, IsOptional } from 'class-validator';
import { UserModel, IUserModel } from '../models/users.model';

export interface IUserCreateDTO extends Pick<IUserModel, 'name' | 'nickName' | 'pass' | 'email'> {
}

@Exclude()
export class UserCreateDTO extends UserModel {
  @Expose()
  @IsOptional()
    id: number;

  @IsEmpty()
    dateUp: Date;

  @IsEmpty()
    recoveryToken: string;

  @IsDefined()
  @Expose()
    name: string;

  @IsDefined()
  @Expose()
    nickName: string;

  @IsDefined()
  @Expose()
    pass: string;

  @IsDefined()
  @Expose()
    email: string;
}

@Exclude()
export class UserGetDTO extends UserModel {
  @IsDefined()
  @Expose()
    id: number;
}

@Exclude()
export class UserUpdateDTO extends UserModel {
  @Expose()
  @IsDefined()
  @IsOptional()
    name: string;

  @Expose()
  @IsOptional()
    nickName: string;
}
