const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'A user must have a name']
    },
    email: {
        type: String,
        require: [true, 'A user must have a name'],
        unique: [true, 'This gmail is already exits'],
        lowercase: true,
    },
    password: {
        type: String,
        require: [true, 'Password required'],
        minlength: [6, 'Too short password'],
    },

    phone: {
        type: String,
        unique: [true, 'This phone number already exists'],
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }


});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);