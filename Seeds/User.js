const mongoose = require('mongoose');
const PatientModel = require('../models/PatientModel');
const UserModel = require('../models/UserModel');
const User = require('./usermodel.js');

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
    console.log("Deleted all Patients");
    for (let i = 0; i < 30; i++) {

        const Users = new UserModel({
            //YOUR USER ID
            username: User[i].username,
            ContactNumber: User[i].ContactNumber,
            Address: User[i].Address,
            Type: Type[i % 3],
            Name: User[i].Namme,
            Password: User[i].Password

        })
        await Users.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})