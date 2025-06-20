import jwt from 'jsonwebtoken'
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

export const loginUser = async ( req, res ) =>{
    const { email, password } = req.body;

    try {
        // check if user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }

        // compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        };

        // generate JWT
        const token = jwt.sign(
            {
                userId : user._id,
                role: user.role
            },process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1d'
            }
        );

        // respond with token and user info
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
         res.status(500).json({
      message: 'Login failed',
      error: error.message
    });
  }
    };
