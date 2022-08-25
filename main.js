//modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const aux = require('./data/mongo/mongodatabase')
const cors = require('cors')

//ler json
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
app.use(cors())

//rotas API
const signup = require('./routes/sign-up')

app.use('/signup', signup)


//rota-inicial // endpoint
app.get('/',(req, res)=>{

   res.json({message:'conhecimento'})

})

//porta
aux
 .then(()=>{
console.log("Conectado ao mongoDB")
app.listen(3007)

 })
 .catch((err)=>{
console.log(err)
 })
