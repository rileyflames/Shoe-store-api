import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true // ⏱ adds createdAt and updatedAt
  }
);

userSchema.pre('save', async function (next){
    // Only hash if the password was changed or created
    if(!this.isModified('password')) return next();

    // hash the password with 12 rounds of salt
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
};

// export the model
const User = mongoose.model('User', userSchema);

export default User;