/* eslint-disable max-classes-per-file */
import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsEmpty, IsOptional } from 'class-validator';
import { StatusModel } from '../../../status/data';
import { UserModel, IUserModel } from '../models/users.model';

export interface IUserCreateDTO extends Pick<IUserModel, 'name' | 'nickName' | 'pass' | 'email'> {
}

export interface IUserUpdateDTO extends Pick<IUserModel, 'name' | 'nickName'> {
}

export interface IUserGetDTO extends Pick<IUserModel, 'id' | 'nickName' | 'email'> {
}

@Exclude()
class UserFiltred extends UserModel {
  @Exclude()
  @IsEmpty()
  @IsOptional()
    dateUp: Date;

  @Exclude()
  @IsEmpty()
  @IsOptional()
    recoveryToken: string;

  @Exclude()
    status: StatusModel;

  @Exclude()
    createAt: Date;

  @Exclude()
    updateAt: Date;

  @Exclude()
    deletedAt: Date;
}

@Exclude()
export class UserCreateDTO extends UserFiltred {
  @IsOptional()
    id: number;
}

@Exclude()
export class UserGetDTO extends UserFiltred {
  @Expose()
  @IsOptional()
    id: number;

  @Expose()
  @IsOptional()
    nickName: string;

  @Expose()
  @IsOptional()
    email: string;

  @Exclude()
  @IsOptional()
    name: string;

  @Exclude()
  @IsOptional()
    pass: string;
}

@Exclude()
export class UserUpdateDTO extends UserFiltred {
  @IsOptional()
    name: string;

  @IsOptional()
    nickName: string;

  @IsOptional()
    email: string;

  @IsOptional()
    pass: string;
}

@Exclude()
export class UserUpdateNameOrNickDTO extends UserUpdateDTO {
  @Exclude()
    email: string;

  @Exclude()
    pass: string;
}

@Exclude()
export class UserUpdatePassDTO extends UserUpdateDTO {
  @Exclude()
    nickName: string;

  @Exclude()
    name: string;

  @Exclude()
    email: string;

  @IsDefined()
    pass: string;
}

@Exclude()
export class UserUpdateEmailDTO extends UserUpdateDTO {
  @Exclude()
    nickName: string;

  @Exclude()
    name: string;

  @Exclude()
    pass: string;

  @IsDefined()
    email: string;
}
