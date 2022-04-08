const express = require ('express')
port = 8080
const app = express()
const cors = require('cors')
app.use(cors())
require('./database')
const bodyParser = require ('body-parser');
const jsonParser = bodyParser.json()
app.use(jsonParser)
const User = require('./models/user')
let date_ob = new Date()
let day = ("0" + date_ob.getDate()).slice(-2)
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let year = date_ob.getFullYear()

app.listen(8080, () => {
    console.log("server is listening on port " + port)
})

app.get('/time', (req,res) => {
    res.send("Date: "  + day +"/" + month +"/"  + year +" " +hours+":"+minutes+":"+seconds)
})

app.post('/login',jsonParser,(req,res) => {
    const { email, password } = req.body
    User.findOne({email: req.body.email}).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
            
            user.comparePassword(req.body.password,(err,r)=>{
            if(r)
            {res.send("logged in")}
            else{
                res.send("invaliddddddd")
            }
            })
            
        }else{
        //register
        if (password.length < 6) {
            return res.status(400).json({ message: "Password less than 6 characters" })
        }
        user = new User({email: email,password:password});
        user.save().then(e => {
            res.send("user added successefully")
        })
        .catch(e=>{
            console.log(e)
            res.send("error !!")
        })
        }
    })
    
})


