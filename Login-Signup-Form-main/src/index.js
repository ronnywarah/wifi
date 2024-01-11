const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const exphbs = require('express-handlebars');
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})



// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    
    const data = new LogInCollection({
        name: req.body.name,
        password: req.body.password,
        

    })
    await data.save()

    // const data = {
    //     name: req.body.name,
    //     password: req.body.password
    // }

    const checking = await LogInCollection.findOne({ name: req.body.name })

   try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
        res.send("user details already exists")
    }
    else{
        await LogInCollection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.name
    })
})


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
    res.status(201).render("home", {
        naming: req.body.name,
        // connectionStatus: req.body.connectionStatus,
        // signalStrength: req.body.signalStrength,
        // networkSpeed: req.body.networkSpeed,
        // connectedDevices: req.body.connectedDevices,
        // paymentStatus: req.body.paymentStatus
    });
} else {
    res.send("Incorrect credentials");
}


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})
const Clients = mongoose.model('Clients', {
    // Define your model schema here
    connectionStatus: "string", signalStrength: "string", networkSpeed: "string",
    connectedDevices: "string", paymentStatus: "string"
  });

  // Define a route to fetch data from MongoDB and render it using Handlebars
app.get('/', async (req, res) => {
    try {
      // Fetch data from MongoDB using your Mongoose model
      const data = await Clients.find();
  
      // Render the data using Handlebars template
      res.render('index', { data });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


app.listen(port, () => {
    console.log('port connected');
})