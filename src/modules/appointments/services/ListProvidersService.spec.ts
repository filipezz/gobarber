import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'filipe@a.com',
      name: 'filipe',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      email: 'filipe@b.com',
      name: 'filipe',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      email: 'filipe@c.com',
      name: 'filipe',
      password: '123456',
    });

    const providers = await listProviders.run({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
