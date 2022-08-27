import {
  DataSource, EntityTarget, Repository,
} from 'typeorm';
import { AppDataSource } from '../config';

interface IConnection {
  init(): Promise<true | Error>;
  getRepo<T>(entity: EntityTarget<T>): Promise<Repository<T>>;
  quit(): Promise<void>;
}

const errors = {
  sourceUndefined: 'Data source not initialized',
  sourceDefined: 'Data source is alredy initialized',
};

export class Connection implements IConnection {
  private source: DataSource | undefined;

  async init() {
    if (this.source) {
      throw Error(errors.sourceDefined);
    }
    return AppDataSource.initialize()
      .then((res) => {
        this.source = res;
        return true;
      })
      .catch((error) => error);
  }

  async getRepo<T>(entity: EntityTarget<T>) {
    if (!this.source) {
      throw Error(errors.sourceUndefined);
    }
    return this.source.getRepository(entity);
  }

  async rawQuery(query: string) {
    if (!this.source) {
      throw Error(errors.sourceUndefined);
    }
    return this.source.query(query);
  }

  async quit() {
    if (!this.source) {
      throw Error(errors.sourceUndefined);
    }
    await this.source.destroy();
    this.source = undefined;
  }
}
