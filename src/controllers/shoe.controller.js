import { Shoe } from '../models/shoe.model.js';




export const getAllShoes = async (req, res) => {

    try {
        // fetch all shoes that aren't deleted
        const shoes = await Shoe.find({deleted : false});

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
// used to soft delete items 
export const softDeleteShoe = async (req, res) => {
  const { id } = req.params;

  try {
    const shoe = await Shoe.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true, runValidators: true }
    );

    if (!shoe) {
      return res.status(404).json({ message: 'Shoe not found' });
    }

    res.status(200).json({
      message: 'Shoe moved to recycle bin',
      shoe
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to soft-delete shoe',
      error: error.message
    });
  }
};

export const getDeletedShoes = async ( req, res ) => {
    try {
        const deletedShoes = await Shoe.find({ deleted : true});

        // successful 
        res.status(200).json(deletedShoes);
    } catch (error) {
        res.status(500).json({
        message: 'Failed to fetch deleted shoes',
        error: error.message
    });
    }
}

export const restoreShoe = async ( req, res ) => {
    const { id } = req.params;

    // check the database for shoes with the attribute "deleted" then switch it from false to tue
    try {
        const restoredShoe = await Shoe.findByIdAndUpdate(id, {
            deleted : false
        },{
            new: true, runValidators : true
        });

        // if the shoe isn't found then return 404 code
        if(!restoredShoe){
            return res.status(404).json({
                message: 'Shoe not found'
            });
        };
        // if successful 
        res.status(200).json({
            message: 'Shoe restored successfully',
            shoe: restoredShoe
        });

    } catch (error) {
        // if something goes wrong
        res.status(400).json({
            message : 'Failed to restore shoe',
            error: error.message
        })
    }
}

export const permanentlyDeleteShoe = async ( req, res ) => {
    // parse the req,params for the id

    const { id } = req.params;

    try {
        const deleted = await Shoe.findByIdAndDelete(id);

        if(!deleted){
            return res.status(404).json({
                message: 'Shoe not found'
            });
        }
        // success?
        res.status(200).json({
            message: 'Shoe permanently deleted'
        })
        
    } catch (error) {
        res.status(400).json({
            message: 'Failed to permanently delete shoe',
            error: error.message
        });
        
    }
};