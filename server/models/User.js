// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Node.js-ലെ ഡിഫോൾട്ട് മൊഡ്യൂൾ

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false, // find() ഉപയോഗിക്കുമ്പോൾ പാസ്‌വേഡ് ലഭിക്കാതിരിക്കാൻ
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// പാസ്‌വേഡ് സേവ് ചെയ്യുന്നതിന് മുൻപ് ഹാഷ് ചെയ്യുന്നു (ശരിയാക്കിയ കോഡ്)
userSchema.pre('save', async function (next) {
    // പാസ്‌വേഡ് ഫീൽഡ് മാറ്റിയിട്ടില്ലെങ്കിൽ അടുത്തതിലേക്ക് പോകുക
    if (!this.isModified('password')) {
        return next();
    }

    // പാസ്‌വേഡ് മാറ്റിയിട്ടുണ്ടെങ്കിൽ മാത്രം hash ചെയ്യുക
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // എന്തെങ്കിലും പിശകുണ്ടെങ്കിൽ അത് കൈകാര്യം ചെയ്യുക
    }
});

// പാസ്‌വേഡ് താരതമ്യം ചെയ്യാനുള്ള മെത്തേഡ്
userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// ലോഗിൻ ചെയ്യുമ്പോൾ JWT (Json Web Token) ഉണ്ടാക്കാനുള്ള മെത്തേഡ്
userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// പാസ്‌വേഡ് റീസെറ്റ് ടോക്കൺ ഉണ്ടാക്കാനുള്ള മെത്തേഡ്
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    // ടോക്കൺ ഹാഷ് ചെയ്ത് ഡാറ്റാബേസിൽ സേവ് ചെയ്യുന്നു
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    // ടോക്കൺ 10 മിനിറ്റ് നേരത്തേക്ക് വാലിഡ് ആയിരിക്കും
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); 

    return resetToken; // ഇമെയിലിൽ അയക്കാനുള്ള യഥാർത്ഥ ടോക്കൺ
};

module.exports = mongoose.model('User', userSchema);