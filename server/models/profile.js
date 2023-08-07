const mongoose = require("mongoose")


const profileSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {type: String, required: true, unique: true},
    phone_number: String,
    gender: String,
    Address: String,
    martial_status: String, 
    dob: Number,
    designation: String,
    education: String,
    experience: String,
    joining_date: Date,

    
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile;