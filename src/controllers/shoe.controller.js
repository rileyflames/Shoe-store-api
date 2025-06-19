import { Shoe } from '../models/shoe.model.js';




export const getAllShoes = async (req, res) => {

    try {
        // fetch all shoes
        const shoes = await Shoe.find();

        // send back as json with 200 status code
        res.status(200).json(shoes)
    } catch (error) {
        res.status(500).json({
            message: 'Server error fetching shoes', error: error.message
        })
    }
}

export const createShoe = async (req, res) => {
    try {
        // Create a new instance using request body
        const newShoe = new Shoe(req.body);
        const savedShoe = await newShoe.save(); // save it to MongoDB

        res.status(201).json(savedShoe) // Respond with 201 created + saved shoe

    } catch (error) {
        res.status(400).json({
            message: 'Failed to create shoe',
            error: error.message
        })
    }
}

export const getShoeById = async ( req, res ) => {
    // get id from the request

    const { id } = req.params;

    try {
        // use the id to search through the database
        const shoe = await Shoe.findById(id);

        if(!shoe){
            return res.status(404).json({
                message: 'Shoe not found'
            });
        }
        // if successful return 200
        res.status(200).json(shoe);

    } catch (error) {
        // catch the error
        res.status(400).json({
            message: 'Invalid shoe ID',
            error: error.message
        })
    }
};


export const updateShoe = async (req, res) => {
    // deconstruct the params and extract the id
    const { id } = req.params;
    // take the request body and store it 
    const updates = req.body;

    try {
        const updatedShoe = await Shoe.findByIdAndUpdate(id, updates, {
          new : true,
          runValidators : true 
        });

        if(!updatedShoe){
            return res.status(404).json({
              message: 'Shoe not found'  
            })
        }

        res.status(200).json(updatedShoe)

    } catch (error) {
        res.status(400).json({ message: 'Failed to update shoe', error: error.message });
    }

}

export const deleteShoe = async ( req, res) => {
    const { id } = req.params;

    try{
        const deletedShoe = await Shoe.findByIdAndDelete(id);

        if(!deletedShoe){
            return res.status(404).json({
                message: 'Shoe not found'
            });
        }
        // if successful in finding the id, then delete
        res.status(200).json({
            message: 'Shoe deleted successfully '
        })
    }catch(error){
        res.status(400).json({ message: 'Failed to delete shoe', error: error.message });
    }
}