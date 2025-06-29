import { Router } from 'express';
import { 
  register, 
  login, 
} from '../controllers/auth';
import { RequestHandler } from 'express';

const router = Router();

// Public routes
router.post('/register', register as unknown as RequestHandler);
router.post('/login', login as unknown as RequestHandler);

export default router;



