import { Router } from 'express';
import { getSecret, createSecret } from '../controllers/secret.controller';
import {
  getSecretValidation,
  createSecretValidation,
} from '../validators/secret.validation';

const router = Router();

router.get('/secret/:hash', getSecretValidation, getSecret);
router.post('/secret', createSecretValidation, createSecret);

export default router;
