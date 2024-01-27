const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../tempelates');
const publicPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    try {
        const existingUser = await LogInCollection.findOne({ name: req.body.name });

        if (existingUser) {
            res.send("User details already exist");
        } else {
            const data = new LogInCollection({
                name: req.body.name,
                networkDevicesname: req.body.networkDevicesname,
                password: req.body.password,          
                paymentStatus: req.body.paymentStatus,
                connectedDevices: req.body.connectedDevices,
                connectionStatus: req.body.connectionStatus,
                networkSpeed: req.body.networkSpeed,
                signalStrength: req.body.signalStrength,
                Amount: req.body.Amount,
                currentBalance: req.body.currentBalance,
                subscriptionStartDate: req.body.subscriptionStartDate,
                RemainingDays: req.body.day
            });

            await data.save();
            res.status(201).render("home", {
                naming: req.body.name,
                user: data // Pass the user data to the template
            });
        }
    } catch (error) {
        res.send("Error in signup");
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            res.status(201).render("home", {
                naming: req.body.name,
                user: check // Pass the user data to the template
            });
        } else {
            res.send("Incorrect credentials");
        }
    } catch (e) {
        res.send("Wrong details");
    }
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});
