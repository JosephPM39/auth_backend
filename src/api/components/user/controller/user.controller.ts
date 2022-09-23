import { FindOptionsWhere, Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  UserCreateDTO, UserGetDTO, UserUpdateDTO, Store, UserModel,
} from '../data';
import { IController } from '../..';
import { IUserCreateDTO, IUserGetDTO } from '../data/dto/user.dto';

type Id = UserGetDTO['id'];

const dataParse = (data: unknown) => {
  if (typeof data === 'string') {
    return JSON.parse(data);
  }
  if (typeof data === 'object') {
    return data;
  }
  return null;
};

const validateDTO = async (dto: object) => {
  const valid = await validate(dto);
  if (valid.length > 0) {
    throw Error(`Invalid data: ${
      valid.reduce((previous, current) => ` ${previous} \n ${current}`, '')
    }`);
  }
};

export class UserController implements IController<
  UserModel,
  IUserCreateDTO,
  Id,
  UserGetDTO,
  UserUpdateDTO
> {
  private repo: Repository<UserModel>;

  private connection: Store;

  constructor(
    connection: Store,
  ) {
    this.connection = connection;
  }

  async init() {
    this.repo = await this.connection.getRepo(UserModel);
  }

  async read(id?: Id | UserGetDTO | string) {
    if (!this.repo) await this.init();
    if (id) {
      const data = dataParse(id) ?? { id };
      validateDTO(plainToInstance(UserGetDTO, data));
      const res = await this.repo.find({
        where: data as FindOptionsWhere<IUserGetDTO>,
      });
      if (res.length < 1) return null;
      return res;
    }
    return this.repo.find();
  }

  async create(data: IUserCreateDTO | string): Promise<boolean | Id> {
    if (!this.repo) await this.init();
    const finalData = dataParse(data);
    const dto = plainToInstance(UserCreateDTO, finalData);
    validateDTO(finalData);
    const res = await this.repo.save(dto);
    if (res.id) {
      return res.id;
    }
    return false;
  }

  async update(id: Id, data: string | UserUpdateDTO): Promise<boolean> {
    if (!this.repo) await this.init();
    const finalData = plainToInstance(UserUpdateDTO, dataParse(data));
    validateDTO(finalData);
    const res = await this.repo.update(
      { id } as FindOptionsWhere<UserGetDTO>,
      finalData,
    );
    return (res?.affected ?? -1) > 0;
  }

  async delete(id: string | Id | UserGetDTO): Promise<boolean> {
    if (!this.repo) await this.init();
    const finalData = dataParse(id) ? null : { id };
    if (!finalData) throw Error('Invalid Id, Id can\'t be Object');
    validateDTO(plainToInstance(UserGetDTO, finalData));
    const res = await this.repo.delete(
      { id } as FindOptionsWhere<UserGetDTO>,
    );
    return (res?.affected ?? -1) > 0;
  }
}
