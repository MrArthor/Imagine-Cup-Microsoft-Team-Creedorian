const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const Flash = require("connect-flash");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
// const PatientRoutes = require('./routers/PatientRoutes')
const app = express();
const server = require('http').createServer(app);

const GeneralRoutes = require('./routers/GeneralRoutes')
const DoctorRoutes = require('./routers/DoctorRoutes')
const PatientRoutes = require('./routers/PatientRoutes')
const VolunteerRoutes = require('./routers/VolunteerRoutes')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


mongoose.set('strictQuery', false);


mongoose.connect("mongodb://localhost:27017/MajorProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "View"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'Public')))
const SessionConfig = {
    secret: 'Thisshoudbebettersecret1',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(SessionConfig))
app.use(Flash())
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', GeneralRoutes)
app.use('/Patient', PatientRoutes);
app.use('/Doctor', DoctorRoutes);
app.use('/Volunteer', VolunteerRoutes);
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.Error = req.flash('error');
    res.locals.CurrentUser = req.user;

    next();
})



app.get("/", (req, res) => {
    const Title = "Home-Page";
    const CssLink = 'home-page'
    res.render('General/home-page', { Title, CssLink });

});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    const Title = "Error-Page";
    const CssLink = 'error-page'
    res.status(statusCode).render('error', { err, Title, CssLink });
})


// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = "Oh No, Something Went Wrong!";
//     res.status(statusCode).render("error", { err });
// });

app.listen(9483, () => {
    console.log("Serving on port 9483");
});