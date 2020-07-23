import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async run({ name, email, password }: IRequest): Promise<User> {
    const checkUserExsists = await this.usersRepository.findByEmail(email);

    if (checkUserExsists) {
      throw new AppError('Email address already used');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidadePrefix('providers-list');
    return user;
  }
}

export default CreateUserService;
