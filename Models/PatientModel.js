const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('./UserModel');
const DoctorModel = require('./DoctorModel');
const VolunteerModel = require('./VolunteerModel');
const PatientSchema = new Schema({
    UserDetails: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    PreHistory: String,
    Doctor: {
        type: Schema.Types.ObjectId,
        ref: 'DoctorModel',
        // required: true
    },
    Volunteer: {
        type: Schema.Types.ObjectId,
        ref: 'VolunteerModel',
        // required: true
    },
    Status: String,
    Age: Number,
    Treatment: String,
    Sex: String,
    BloodGroup: String,
    BloodSugar: Number,
    PulseRate: Number,
    Temperature: Number,
    BloodPressure: Number,
    Weight: Number,
    Height: Number,
    Emr: {
        type: Schema.Types.ObjectId,
        ref: 'EmrModel',
        // required: true
    },
});

module.exports = mongoose.model('PatientModel', PatientSchema);