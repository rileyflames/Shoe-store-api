import express from 'express';
import { getAllShoes , createShoe, getShoeById, updateShoe, softDeleteShoe, getDeletedShoes, restoreShoe, permanentlyDeleteShoe} from '../controllers/shoe.controller.js';

// use the express router
const router = express.Router();




router.get('/shoes', getAllShoes); // get all shoes

router.post('/shoes', createShoe); // create a new shoe

router.get('/shoes/deleted', getDeletedShoes) // get deleted shoes

router.get('/shoes/:id', getShoeById); // get a specific shoe by id

router.put('/shoes/:id/restore', restoreShoe) // restore a deleted shoe by id

router.put('/shoes/:id', updateShoe) // update a shoe by id

router.delete('/shoes/:id', softDeleteShoe); // delete a shoe by id

router.delete('/shoes/permanent/:id', permanentlyDeleteShoe) // permanently deleted a shoe by id















// export the router
export default router;