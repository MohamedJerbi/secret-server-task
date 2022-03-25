import { Router } from 'express';
import {
  getAllSecrets,
  getSecretByHash,
  createSecret,
} from '../controllers/secret.controller';

const router = Router();

router.get('/all', getAllSecrets);
router.get('/secret/:hash', getSecretByHash);

router.post('/add', createSecret);

export default router;
