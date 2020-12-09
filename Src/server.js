const express = require('express');
const Jwt = require('./Services/Controllers/JTWControl');
const PORT = 3000;
const DBcontrol = require('./Services/Controllers/dbControl')
const db = new DBcontrol();
const jw = new Jwt();
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());



app.get('/checkAuth',AuthMiddleware, async (req,res)=>{

    const {Auth}  = req.body.verfication
    
    if(Auth){
        const {id} = req.body.verfication
      
        const userinfo = await db.UserInfo(id);
       
        if(!userinfo.error){
            res.send(userinfo)
        }else{
            res.send('User not Found')
        }

    }else{
        res.send({Auth})
    }

    

    
})

app.post('/register',async (req,res)=>{
    
    const {user,pass,passverify} = req.body
    const passEqual = pass === passverify
    
    if(user && passEqual && user.length > 3){

        const Userexits = await db.UserExists(user)
        
        if(!Userexits){
            const register = await db.Registration(user,pass);

            return res.send(register)

        }else{
            return res.send({msg:'User Already Exist'})
        }



    }else{
        return res.send({msg:'Invalid Username/Pass'})
    }

})

app.post('/login',async (req,res)=>{

    const {user,pass} = req.body;

    
    

    if(user && pass){
       const userExist = await db.UserExists(user)

       if(userExist){
        const login = await db.Login(user,pass);

        return res.send(login)
        

       }else{
        return res.send({msg:'User not Found in DataBase'})
       }



        
        
    }else{
        return res.send({msg:'Invalid Credencials'});
    }

})
^





app.listen(PORT,()=>{console.log('Server Started At Port' + PORT)})



