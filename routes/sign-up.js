const app =require('express').Router()
const User = require('../models/person');
const cors = require('cors')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer')
app.use(cors())

//middleware

//New Users


app.post("/registro", async (req, res) => {
    
    try {
      // input
      const { name, email,senha } = req.body;
  
      // Validar
      if (!(email && senha && name)) {
        res.status(400).send("Credenciais Insuficientess");
      }
  
      
      // Validar 
      const userAntigo = await User.findOne({ email });
  
      if (userAntigo) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt 
       encryptedPassword = await bcrypt.hash(senha, 10);
  
     
      const user = await User.create({
        name: name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        senha: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return user novo
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    
  });
  app.post("/login", async (req, res) => {

    
    try {
      
      const { email,senha } = req.body;
  
      
      if (!(email && senha)) {
        res.status(400).send("Credencias Invalidas");
      }
      
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(senha, user.senha))) {
        // Criar tkn
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save token
        user.token = token;
  
        
        res.status(200).json(user);
      }
      res.status(400).send("Credencias Invalidas");
    } catch (err) {
      console.log(err);
    }
    
  });
  
  app.post("/forgot", async (req, res) => {

    
    try {
      
      const { email} = req.body;
  
      
      if (!(email)) {
        res.status(400).send("Credencias Invalidas");
      }
      
      const user = await User.findOne({ email });

    const token = crypto.randomBytes(20).toString('hex')
    const now =new Date()
    now.setHours(now.getHours()+1)

    await User.findByIdAndUpdate(user.id,  {
     '$set':{
      passwordResetToken:token,
      passwordResetExpire:now,
     }
    })

    mailer.sendMail({
    to:email,
    from:'jossueltherock@gmail.com', 
    template:'/auth/forgot',
    context:{ token },

  },(err)=>{
    if(err)
    return res.status(400).send({error:'Não foi possivel realizar'})
    
  } )


   } catch (err) {
    console.log(err)
    res.status(400).send({error:'Falha ao solicitar o processo'})
   }


  })
 
app.post("/resetsenha" , async (req, res) => {
const {email,token,senha} = req.body

try {
  const user = await User.findOne({ email })
   .select('+passwordResetToken  passwordResetExpire');

   if(!user){
     return res.status(400).send({error:"User not found"});
    } 

   if(token != user.passwordResetToken){
     return res.status(400).send({error:"token not found"});
    }

   const now= new Date()

   if(now>user.passwordResetExpire){
     return res.status(400).send({error:"token expirado"}); 
    }

    user.senha=senha;
    await user.save();
    res.send();

} catch (error) {
  console.log(err)
  res.status(400).send({error:'Falha ao solicitar o processo'})
}


});


    module.exports = app