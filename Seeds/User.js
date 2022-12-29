const mongoose = require('mongoose');
const PatientModel = require('../models/PatientModel');
const UserModel = require('../models/UserModel');
const User = require('./usermodel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/MajorProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


// console.log(Data);
const Type = ["Patient", "Doctor", "Volunteer"];
const seedDB = async() => {
    await UserModel.deleteMany({});
    console.log("Deleted all Users");
    for (let i = 0; i < 30; i++) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(User[i].Password, salt);
        const Users = new UserModel({
            //YOUR USER ID
            username: User[i].username,
            ContactNumber: User[i].ContactNumber,
            Address: User[i].Address,
            Type: Type[i % 3],
            Name: User[i].Namme,

            Password: hash

        })
        await Users.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})