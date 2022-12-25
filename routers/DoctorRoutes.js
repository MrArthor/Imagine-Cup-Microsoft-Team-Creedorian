const express = require('express');
const router = express.Router(); // Importing Express
const DoctorModel = require('../Models/DoctorModel'); // Importing Doctor Model
const PatientModel = require('../Models/PatientModel'); // Importing Patient Model
const FeedbackModel = require('../Models/FeedbackModel'); // Importing Feedback Model
const calendar = require('node-calendar'); // Importing Calendar
const cal = new calendar.Calendar(calendar.SUNDAY); // Creating Calendar
router.get('/add-doctor', (req, res) => { // Add Doctor Page
    const Title = 'Doctor';
    const CssLink = 'add-doctor'
    res.render('Doctor/add-doctor', { Title, CssLink });
});
router.post('/add-doctor', async(req, res) => { // Add Doctor Page Post Request
    const Doctor = new DoctorModel({

        Qualification: req.body.AddDoc.qualification,
        Specialization: req.body.AddDoc.specialization,
        Experience: req.body.AddDoc.experience,
        Department: req.body.AddDoc.department,
        Domain: req.body.AddDoc.Domain,
        BriefDescription: req.body.AddDoc.briefdoctor,
    });
    await Doctor.save(); // Saving Doctor
    res.redirect(`/doctor/${Doctor._id}`); // Redirecting to Doctor Portal

}); // Exporting Router
router.get('/:id', async(req, res) => { // Doctor Portal
    const Title = "Home";
    const CssLink = 'Doctor-Portal';
    const { id } = req.params;
    const date = new Date();
    const Month = date.getMonth();
    const Year = date.getFullYear();
    const MonthName = calendar.month_name[Month + 1]
    const Doctor = await DoctorModel.findById(id).populate('PatientId').populate('UserDetails');
    res.render('Doctor/Doctor-Portal', { Title, CssLink, Doctor, MonthName, Year });
});

router.get('/:id/vitals-edit-form-doc', async(req, res) => { // Vitals Edit Form
    const Title = "Vitals Edit Form";
    const CssLink = 'Vitals-Edit-Form-Doc';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');

    res.render('Doctor/vitals-edit-form-doc', { Title, CssLink, Doctor }); // Rendering Vitals Edit Form
});
router.post('/:id/vitals-edit-form-doc', async(req, res) => { // Vitals Edit Form Post Request
    const Title = "Vitals Edit Form";
    const CssLink = 'Vitals-Edit-Form-Doc';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');
    const { temp, pulse } = req.body;
    Doctor.Temperature = temp;
    Doctor.PulseRate = pulse;
    await Doctor.save();
    console.log(Doctor)
    res.render('Doctor/vitals-edit-form-doc', { Title, CssLink, Doctor }); // Rendering Vitals Edit Form
});

router.get('/:id/doctor-portal-settings', async(req, res) => { // Doctor Portal Settings
    const Title = "Settings";
    const CssLink = 'Doctor-Portal-Settings';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');

    res.render('Doctor/doctor-portal-settings', { Title, CssLink, Doctor }); // Rendering Doctor Portal Settings
});
router.get('/:id/doctor-portal-calendar', async(req, res) => { // Doctor Portal Calendar
    const Title = "Calendar";
    const CssLink = 'Doctor-Portal-Calendar';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');

    res
        .render('Doctor/doctor-portal-calendar', { Title, CssLink, Doctor }); // Rendering Doctor Portal Calendar
});


router.get('/:id/doctor-portal-patient-individual', async(req, res) => { // Doctor Portal Patient Individual
    const Title = "Patient Individual";
    const CssLink = 'Doctor-Portal-Patient-Individual';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');
    const Patient = 0;
    // const Patient = await PatientModel.findById(Doctor.PatientId);

    res.render('Doctor/doctor-portal-patient-individual', { Title, CssLink, Doctor, Patient }); // Rendering Doctor Portal Patient Individual
});

router.get('/:id/doctor-portal-patient-list', async(req, res) => { // Doctor Portal Patient List

    const Title = "Patient List";
    const CssLink = 'Doctor-Portal-Patient-List';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');

    res.render('Doctor/doctor-portal-patient-list', { Title, CssLink, Doctor }); // Rendering Doctor Portal Patient List
});

router.get('/:id/doctor-portal-patient-profile', async(req, res) => { // Doctor Portal Patient Profile
    const Title = "Patient Profile";
    const CssLink = 'Doctor-Portal-Patient-Profile';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');

    res.render('Doctor/doctor-portal-patient-profile', { Title, CssLink, Doctor }); // Rendering Doctor Portal Patient Profile

});

router.get('/:id/doctor-portal-standard', async(req, res) => { // Doctor Portal Standard
    const Title = "Standard";
    const CssLink = 'Doctor-Portal-Standard';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');

    res.render('Doctor/doctor-portal-standard', { Title, CssLink, Doctor }); // Rendering Doctor Portal Standard
});

router.get('/:id/doctor-portal-feedback', async(req, res) => { // Doctor Portal Feedback
    const Title = "Feedback";
    const CssLink = 'Doctor-Portal-Feedback';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');

    res.render('Doctor/doctor-portal-feedback', { Title, CssLink, Doctor }); // Rendering Doctor Portal Feedback
});
router.post('/:id/doctor-portal-feedback', async(req, res) => { // Doctor Portal Feedback Post Request

    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');
    const DocFeedback = req.body.DocFeed;
    console.log(DocFeedback);
    const Feedback = new FeedbackModel({

        FullName: DocFeedback.fullname,
        Email: DocFeedback.email,
        Message: DocFeedback.feedback,
    })
    await Feedback.save();
    res.redirect('/doctor/' + DoctorId);
});

router.get('/:id/doctor-portal-chat-choose', async(req, res) => { // Doctor Portal Chat Choose
    const Title = "Chat";
    const CssLink = 'Doctor-Portal-Chat-Choose';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');

    res.render('Doctor/doctor-portal-chat-choose', { Title, CssLink, Doctor }); // Rendering Doctor Portal Chat Choose
});

router.get('/:id/doctor-portal-settings', async(req, res) => { // Doctor Portal Settings
    const Title = "Settings";
    const CssLink = 'Doctor-Portal-Settings';
    const DoctorId = req.params.id;
    const Doctor = await DoctorModel.findById(DoctorId).populate('PatientId').populate('UserDetails');

    res.render('Doctor/doctor-portal-standard', { Title, CssLink, Doctor }); // Rendering Doctor Portal Settings
});

router.all('*', (req, res) => { // 404 Page
    const Title = "404";
    const CssLink = 'doctor-portal-standard';

    res.render('Doctor/doctor-portal-standard', { Title, CssLink }); // Rendering 404 Page
});


module.exports = router;