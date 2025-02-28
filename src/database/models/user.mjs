import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
    password: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        default: 'Not Provided',
        length: 10,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },  
    role: {
        type: String,
        enum: ['blogger', 'admin', 'author'],
        default: 'blogger'
    
    },
    verificationToken: String,
    googleId: String,
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;