const express = require ('express')
port = 8080
const app = express()
const cors = require('cors')
app.use(cors())
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