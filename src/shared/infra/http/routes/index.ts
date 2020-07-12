import { Router } from 'express';
import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/appointments', appointmentsRoutes);
routes.use('/providers', providersRouter);

export default routes;
