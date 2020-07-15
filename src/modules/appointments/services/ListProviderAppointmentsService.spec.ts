import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the day appointments of a provider ', async () => {
  const appointment1 = await fakeAppointmentsRepository.create({
      provider_id:'provider',
      user_id:'user',
      date: new Date(2020,4,20,14,0,0)
    })
 const appointment2 =    await fakeAppointmentsRepository.create({
      provider_id:'provider',
      user_id:'user',
      date: new Date(2020,4,20,15,0,0)
    })
const appointments = await listProviderAppointmentsService.run({
  day:20,
  month:5,
  provider_id: 'provider',
  year:2020
})
    expect(appointments).toEqual([appointment1,appointment2])
  });
});
