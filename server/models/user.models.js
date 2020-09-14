const { Schema, model } = require('mongoose');
const crypto = require('crypto');
const { v4:uuidv4 }  = require('uuid');

const userSchema = new Schema({
   name: {
       type: String,
       required: true,
       maxlength: 30,
       trim: true
   },
   last_name: {
       type: String,
       maxlength: 30,
       trim: true
   },
   email: {
       type: String,
       required: true,
       maxlength: 25,
       unique: true,
       trim: true
   },
   encrypted_password: {
    type: String,
    required: true
   },
   salt : {
     type: String
   },
   role: {
       type: Number,
       default: 0
   },
   purchases: {
       type: Array,
       default: []
   }
},

{timestamps: true}

);

//Virtual Method to genrate Salt and encrypt Password
userSchema.virtual('password')
  .set(function(password) {
      this._password = password;
      this.salt = uuidv4();
      this.encrypted_password = this.securePassword(password);
  })
  .get(function() {
      return this._password;
  })

  
//Methods for the model
userSchema.methods = {
   authenticate: function(plainPassword) {
     return this.securePassword(plainPassword) === this.encrypted_password;
   },

   securePassword: function(plainPassword) {
      if(!plainPassword) return "";

      try{
       return crypto.createHmac('sha256', this.salt)
       .update(plainPassword)
       .digest('hex');
      }
      catch(error) {
        return "";
      }
   }
}


module.exports = model('User', userSchema);