const mongoose = require('./connection') // this will hold our collection information

// This pulls schema and model from mongoose
const {Schema, model} = mongoose // this is called destructuring
// ^ this is the same saying
// const Schema = mongoose.schema
// const model = mongoose.model


// This creates our Schema that will tell the database what to look like/for for users
const userSchema = new Schema({
    // type means it will appear as a string
    // required means you need to have the username or it wont save
    // unique means 2 of the same usersnames cannot exist
    username: {type: String, required: true, unique: true},
    
    // we dont want unique because we dont want only 1 user to have that password, will make it easier for hackers to figure out what password goes to what user
    password: {type: String, required: true}
})

const User = model('User', userSchema)

module.exports = User