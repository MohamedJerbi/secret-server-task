import { Router } from 'express';
import { getSecret, createSecret } from '../controllers/secret.controller';

const router = Router();

router.get('/secret/:hash', getSecret);
router.post('/secret', createSecret);

export default router;
