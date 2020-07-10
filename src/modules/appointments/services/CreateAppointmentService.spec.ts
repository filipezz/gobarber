import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.run({
      date: new Date(),
      provider_id: '212315',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('212315');
  });
  it('should not be able to create two appointments on the same date', async () => {
    await createAppointment.run({
      date: new Date(2020, 4, 10, 11),
      provider_id: '212315',
    });

    await expect(
      createAppointment.run({
        date: new Date(2020, 4, 10, 11),
        provider_id: '1111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
