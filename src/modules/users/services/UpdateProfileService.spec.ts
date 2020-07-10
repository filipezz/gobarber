import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'filipe@a.com',
      name: 'filipe',
      password: '123456',
    });

    const updatedUser = await updateProfileService.run({
      user_id: user.id,
      name: 'Jehsen',
      email: 'jehnsen@a.com',
    });
    expect(updatedUser.name).toBe('Jehsen');
    expect(updatedUser.email).toBe('jehnsen@a.com');
  });
  it('should not be able to update profile of a non existing user', async () => {
    await expect(
      updateProfileService.run({
        user_id: 'not existing user id',
        name: 'Jehsen',
        email: 'jehnsen@a.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to change the email to another an email that already is been used', async () => {
    await fakeUsersRepository.create({
      email: 'filipe@a.com',
      name: 'filipe',
      password: '123456',
    });
    const user = await fakeUsersRepository.create({
      email: 'jehsen@a.com',
      name: 'jehsen',
      password: '123456',
    });

    await expect(
      updateProfileService.run({
        user_id: user.id,
        name: 'Jehsen',
        email: 'filipe@a.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'filipe@a.com',
      name: 'filipe',
      password: '123456',
    });

    const updatedUser = await updateProfileService.run({
      user_id: user.id,
      name: 'Jehsen',
      email: 'jehnsen@a.com',
      password: '123123',
      old_password: '123456',
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not  be able to update the password without providing the old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'filipe@a.com',
      name: 'filipe',
      password: '123456',
    });

    await expect(
      updateProfileService.run({
        user_id: user.id,
        name: 'Jehsen',
        email: 'jehnsen@a.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not  be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'filipe@a.com',
      name: 'filipe',
      password: '123456',
    });

    await expect(
      updateProfileService.run({
        user_id: user.id,
        name: 'Jehsen',
        email: 'jehnsen@a.com',
        password: '123123',
        old_password: 'wrong old password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
