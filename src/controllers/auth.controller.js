import User from "../models/user.model.js";

export const registerUser = async ( req, res ) =>{
    const { name, email, password } = req.body;

    try {
        // step 1: Check if the email is already in use
        const existingUser = await User.findOne({ email });

        // if the user already exists return an error 
        if (existingUser){
            return res.status(409).json({
                message: 'Email is already in use'
            })
        }
        // step 2: Create a new user instance
        const newUser = new User({ name, email, password });
        await newUser.save()

        // step 3: Return the created user ( omit password)
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });   

    } catch (error) {
        // catch any error
        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        })
    }
}