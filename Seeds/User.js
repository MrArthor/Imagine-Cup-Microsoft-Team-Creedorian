const mongoose = require('mongoose');
const PatientModel = require('../models/PatientModel');
const UserModel = require('../models/UserModel');
const DoctorModel = require('../models/DoctorModel');
const VolunteerModel = require('../models/VolunteerModel');
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
    const Patient = await PatientModel.find({});
    const Doctor = await DoctorModel.find({});
    const Volunteer = await VolunteerModel.find({});
    var Pa = 0,
        Do = 0,
        Vo = 0;

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
        if (i % 3 == 0) {
            Patient[Pa].UserDetails = Users._id;
            await Patient[Pa].save();
            Pa++;
        }
        if (i % 3 == 1) {
            Doctor[Do].UserDetails = Users._id;
            await Doctor[Do].save();
            Do++;
        }
        // if (i % 3 == 2) {
        //     Volunteer[Vo].UserDetails = Users._id;
        //     await Volunteer[Vo].save();
        //     Vo++;
        // }

        await Users.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})