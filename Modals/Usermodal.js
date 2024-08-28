import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';
//schema
const userchema = new mongoose.Schema(
    {
    name:{
        type: String,
        required:[true, 'Name is Require']
    },
    email:{
        type: String,
        required:[true, 'Email is Require'],
        unique:true,
        validate: validator.isEmail
    },
    password:{
        type: String,
        required: [true, 'Password is Require'],
        minlength: [6, "password length should be greater than 6"],
        select: true,
    },
    location:{
        type: String,
        default: "India",
    },
},
 {timestamps:true},
);
userchema.pre('save', async function(){
    if(!this.isModified) return;
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt);
});

//compare password
userchema.methods.comparepassword = async function(userpassword){
    const isMatch = await bcryptjs.compare(userpassword,this.password);
    return isMatch;
};
//JSON Web Token
userchema.methods.createJWT = function(){
    return JWT.sign({userId: this._id},process.env.JWT_SECRET, {expiresIn: '1d'})
}


export default mongoose.model('User', userchema);