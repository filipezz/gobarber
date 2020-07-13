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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.run({
      user_id: '111111',
      date: new Date(2020, 4, 10, 13),
      provider_id: '212315',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('212315');
  });

  it('should not be able to create two appointments on the same date', async () => {
    await createAppointment.run({
      user_id: '111111',
      date: new Date(2020, 8, 10, 13),
      provider_id: '212315',
    });

    await expect(
      createAppointment.run({
        user_id: '111111',
        date: new Date(2020, 8, 10, 13),
        provider_id: '1111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.run({
        user_id: '111111',
        date: new Date(2020, 4, 10, 11),
        provider_id: '1111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to the provider create an appointment with himself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.run({
        user_id: '111111',
        date: new Date(2020, 4, 10, 13),
        provider_id: '111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able create an appointment before 8AM and 5PM', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.run({
        user_id: '111111',
        date: new Date(2020, 4, 11, 7),
        provider_id: '111112',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointment.run({
        user_id: '111111',
        date: new Date(2020, 4, 11, 18),
        provider_id: '111112',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
