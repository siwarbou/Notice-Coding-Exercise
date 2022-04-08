const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://siwar:soubou123@cluster0.wuorv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  dbName:'siwar',
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(()=>{
      console.log("connected to mongodb")
}).catch((err)=> console.log(err.message))

mongoose.connection.on('connected', ()=>{
  console.log('Mongoose connected to db : siwar')
})

mongoose.connection.on('error', (err)=>{
  console.log(err.message)
})

mongoose.connection.on('disconnected', ()=>{
  console.log('Mongoose is disconnected')
})

process.on('SIGINT', async()=>{
  await mongoose.connection.close();
  process.exit(0)
})