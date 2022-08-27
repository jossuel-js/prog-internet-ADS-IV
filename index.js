//modules
const express = require('express');
const app = express();
const authToken = require('./middlewares/authToken')
const authMiddle = require('./middlewares/auth_midleware')
const aux = require('./data/mongo/mongodatabase')

require("dotenv").config();
const cors = require('cors')

//ler json

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
app.use(cors())
app.use(authMiddle)


//rotas API
const signup = require('./routes/sign-up')


app.use('/home', signup)



//rota-inicial // endpoint
app.get('/',authToken,(req, res)=>{

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
