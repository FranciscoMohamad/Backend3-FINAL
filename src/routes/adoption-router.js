import { Router } from 'express';
import { adoptionController } from '../controllers/adoption-controller.js';

const router = Router();

router.get('/', adoptionController.getAll);
router.get('/:id', adoptionController.getById);
router.post('/', adoptionController.create);
router.put('/:id', adoptionController.update);
router.delete('/:id', adoptionController.delete);

export default router;