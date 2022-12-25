const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('./UserModel');
const PatientModel = require('./PatientModel');
const VolunteerModel = require('./VolunteerModel');
const DoctorSchema = new Schema({
    UserDetails: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true

    },
    Experience: Number,
    Specialization: String,
    Qualification: String,
    NoOfPatients: Number,
    Department: String,
    BriefDescription: String,
    Domain: String,

    Temperature: Number,
    PulseRate: Number,
    TestsScheduled: Number,
    PatientId: [{
        type: Schema.Types.ObjectId,
        ref: 'PatientModel',
        // required: true
    }],
    Volunteers: [{
        type: Schema.Types.ObjectId,
        ref: 'VolunteerModel',
        // required: true
    }]


});

module.exports = mongoose.model('DoctorModel', DoctorSchema);