import { Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  UserCreateDTO, UserGetDTO, UserUpdateDTO, Store, UserModel,
} from '../data';
import { IController } from '../..';
import { IUserCreateDTO } from '../data/dto/user.dto';

export class UserController implements IController<
  UserModel,
  IUserCreateDTO,
  UserGetDTO['id'],
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

  async read(id?: UserModel['id'] | UserGetDTO) {
    if (!this.repo) await this.init();
    if (id) {
      const data = (typeof id === 'number') ? { id } : instanceToPlain(id);
      const res = await this.repo.find({
        where: data,
      });
      if (res.length < 1) return null;
      return res;
    }
    return this.repo.find();
  }

  async create(data: IUserCreateDTO | string): Promise<boolean | IUserCreateDTO> {
    if (!this.repo) await this.init();
    let finalData = data;
    if (typeof data === 'string') {
      finalData = JSON.parse(data);
    }
    const dto = plainToInstance(UserCreateDTO, finalData);
    const valid = await validate(dto);
    if (valid.length > 0) {
      return false;
    }
    const res = await this.repo.save(dto);
    return res;
  }
}
