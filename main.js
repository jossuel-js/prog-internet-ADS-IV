//modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');



//ler json
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas API
const signup = require('./routes/sign-up-in')

app.use('/person', signup)


//rota-inicial // endpoint
app.get('/',(req, res)=>{

   res.json({message:'conhecimento'})

})

//porta
mongoose.connect(
    'mongodb+srv://jossueljs:3h32gvY0fKIPzlCm@apicluster.9pleccd.mongodb.net/?retryWrites=true&w=majority'
    )
 .then(()=>{
console.log("Conectado ao mongoDB")
app.listen(3000)

 })
 .catch((err)=>{
console.log(err)
 })
