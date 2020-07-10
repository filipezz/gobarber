import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;
describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'filipe@a.com',
      name: 'filipe',
      password: '123456',
    });

    const profile = await showProfile.run({
      user_id: user.id,
    });
    expect(profile.name).toBe('filipe');
    expect(profile.email).toBe('filipe@a.com');
    expect(profile.password).toBe('123456');
  });
  it('should not be able to show profile of a non existing user', async () => {
    await expect(
      showProfile.run({
        user_id: ' non existing user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
