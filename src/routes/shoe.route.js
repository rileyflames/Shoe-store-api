import express from 'express';
import { getAllShoes , createShoe, getShoeById, updateShoe, deleteShoe} from '../controllers/shoe.controller.js';

// use the express router
const router = express.Router();


// get all shoes

router.get('/shoes', getAllShoes);

// get shoe by id

router.get('/shoes/:id', getShoeById);

// create a shoe

router.post('/shoes', createShoe);

// update a shoe

router.put('/shoes/:id', updateShoe)

// delete a shoe

router.delete('/shoes/:id', deleteShoe);


// export the router
export default router;