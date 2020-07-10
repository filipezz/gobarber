import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate the user', async () => {
    const user = await createUser.run({
      email: 'filipe@a.com',
      name: 'filipe',
      password: '123456',
    });

    const response = await authenticateUser.run({
      email: 'filipe@a.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate an unexistent user', async () => {
    await expect(
      authenticateUser.run({ email: 'asbaba', password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate the user with wrong password', async () => {
    await createUser.run({
      email: 'filipe@a.com',
      name: 'filipe',
      password: '123456',
    });

    await expect(
      authenticateUser.run({
        email: 'filipe@a.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
