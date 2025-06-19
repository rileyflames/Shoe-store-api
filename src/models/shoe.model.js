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
    },
    color:{
        type: String,
        enum: ['Black', 'White', 'Custom'],
        required: true
    },
    category:{
        type: String,
        enum: ['Running', 'Casual', 'Formal', 'Sneakers', 'Boots'],
        required: true
    },
    description:{
        type: String,
        trim: true,
        default: ''
    },
    imageUrl:{
        type: String,
        required: true,
        trim: true
    },
    modelSlug:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
},{
    timestamps : true
});


export const Shoe = model('Shoe', shoeSchema);