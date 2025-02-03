import { Router } from 'express';
import { UserRoutes } from '../module/User/user.route.js';
import { patientRoutes } from '../module/Patient/patient.route.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/patients',
    route: patientRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
