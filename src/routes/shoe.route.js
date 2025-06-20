import express from 'express';
import { getAllShoes , createShoe, getShoeById, updateShoe, softDeleteShoe, getDeletedShoes, restoreShoe, permanentlyDeleteShoe} from '../controllers/shoe.controller.js';

// middleware 
import authMiddleware from '../middleware/auth.middleware.js'

// use the express router
const router = express.Router();





router.get('/shoes', getAllShoes); // public

router.get('/shoes/deleted', authMiddleware, getDeletedShoes); // protected ✅ placed BEFORE :id
router.get('/shoes/:id', getShoeById); // public

router.post('/shoes', authMiddleware, createShoe); // protected

router.put('/shoes/:id/restore', authMiddleware, restoreShoe); // protected ✅ placed BEFORE :id
router.put('/shoes/:id', authMiddleware, updateShoe); // protected

router.delete('/shoes/permanent/:id', authMiddleware, permanentlyDeleteShoe); // protected ✅ placed BEFORE :id
router.delete('/shoes/:id', authMiddleware, softDeleteShoe); // protected















// export the router
export default router;