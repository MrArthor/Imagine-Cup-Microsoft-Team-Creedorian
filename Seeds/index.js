const mongoose = require('mongoose');
const DoctorModel = require('../models/DoctorModel');
const Data = require('./MOCK_DATA.js');
const UserModel = require('../models/UserModel');
mongoose.connect('mongodb://localhost:27017/MajorProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// console.log(Data);
const seedDB = async() => {
    await DoctorModel.deleteMany({});
    const Users = await UserModel.find({});
    for (let i = 0; i < 10; i++) {

        const doctor = new DoctorModel({
            //YOUR USER ID
            UserDetails: Users[i + 10]._id,
            Experience: Math.floor(Math.random() * 10) + 1,
            Specialization: Data[i].Qualification,
            NoOfPatients: 0,
            Temperature: Data[i].noofpatient % 100,
            PulseRate: Data[i].noofpatient % 200,
            TestsScheduled: Data[i].noofpatient % 30,
            Department: Data[i].Qualification,
            BriefDescription: Data[i].Qualification,
            Domain: Data[i].Domain
        })
        await doctor.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})