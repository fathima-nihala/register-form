//0MDB19PS7ZDGGq2A
//mongodb+srv://fathimanihala200214:0MDB19PS7ZDGGq2A@cluster0.aqc4dnk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./modals/Register')
require('dotenv').config();


const app = express()
app.use(cors(
    {
        origin: ["https://register-form-mocha-three.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})