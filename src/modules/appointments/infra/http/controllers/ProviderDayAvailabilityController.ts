import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, year, month } = request.body;
    const { provider_id } = request.params;
    const providerDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );
    const availability = await providerDayAvailability.run({
      provider_id,
      month,
      day,
      year,
    });

    return response.json(availability);
  }
}
