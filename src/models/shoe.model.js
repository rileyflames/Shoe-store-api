import mongoose from 'mongoose';

const {Schema, model} = mongoose;


const shoeSchema = new Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    brand:{
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock:{
        type: Number,
        reuired: true,
        default: 0,
        min: 0
    },
    sizes:{
        type: [Number],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: 'At least one size must be provided'
        }
    }
})