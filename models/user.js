var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
}, {timestamps: true});
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
        // hash the password along with our new salt
        bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
    });


//compare supplied password
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports  = mongoose.model('User', UserSchema);