const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,

    },
    hashed_password: {
        type: String, 
        required: true
    },
    salt: String,
    role: {
        type: String,
        default: 'subscriber'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
},{timestamps: true})


userSchema.virtual('password')
    .set(function() {
        this.password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(this.password);
    })
    .get(function() {
        return this ._password
    })

userSchema.methods = {
    makeSalt: function() {
        return Math.round(new Date().valueOf()*Math.random()) +''
    },
    encryptPassword: function(password) {
        if(!password) return ''
        try {
            return crypto.createHmac('sha1',thi.salt)
                    .update(password)
                    .digest('hex');
        } catch(err) {
            return ''
        }
    },
    authenticate: function(plainPassword) {
        return this.encryptPassword(plainPassword) === this.hashed_password;
    }
}

module.exports = mongoose.model('User',userSchema);