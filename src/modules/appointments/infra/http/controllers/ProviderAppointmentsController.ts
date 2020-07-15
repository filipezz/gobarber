import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {  day, month, year } = request.body;
    const provider_id = request.user.id;


    const listProviderAppointments = container.resolve(ListProviderAppointmentsService);
    const appointments = await listProviderAppointments.run({

      day, month, year,
      provider_id,
    });
    return response.json(appointments);
  }
}
