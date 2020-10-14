const mongoose = require("mongoose");

const options = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};
//Creating the schema so the database knows what vairables it will be passed
//Later we can route our schema so login will only require us to check correct email and password
const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 30
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 30,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200
        },
        age: {
            type: String,
            required: true,
            maxlength: 50
        },
        weight: {
            type: String,
            required: true,
            maxlength: 50
        }
    },
    options
);

const User = mongoose.model("User", schema);

module.exports.User = User;
