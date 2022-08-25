const router =require('express').Router()
const Person = require('../models/person');
const authmiddle = require('../middlewares/auth_midleware')
const cors = require('cors')
router.use(cors())

//middleware
//router.use(authmiddle)
//New Users
router.post('/',(req,res)=>{

    //req.body
    
    const  {name,senha, email } = req.body
    
    if(!name){
        res.status(442).json({error:'O nome e Obrigatorio!'})
        return
    }
    
    const person = {
        name,
        senha,
        email
    }
    async function f1(){
      
        try {
       //criando dados
      await  Person.create(person)
       
       res.status(201).json({message:'Pessoa Inserida com sucesso !'})
       
    }
    catch(error){
        res.status(500).json({error: error})
    }
    } 
    
    f1()
    
    
    })


    //req de dados
    router.get('/',async (req, res)=>{
        try {
            const people = await Person.find()
            res.status(200).json(people)

        } catch (error) {
            res.status(500).json({error: error})  
        }
    })

    router.get('/:id', async (req,res)=>{
        const id=req.params.id
        try {
            const person = await Person.findOne({ _id : id })

            if(!person){
                res.status(442).json({error:"usuario não foi encontrado"})
                return
            }

            res.status(200).json(person)
        } catch (error) {
            res.status(500).json({error: error})  
        }
    })

    module.exports = router