const {Sequelize,DataTypes,Model} = require('sequelize');
const {uuid} = require('uuidv4');
const bcrypt = require('bcrypt');
const Jwt = require('./JTWControl');
const jwt = new Jwt();
const path = require('path')
const fs = require('fs')


const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:path.join(__dirname,'..','..' , 'Database/usersdata.db'),
});

class Users extends Model{};

Users.init({
    id:{primaryKey:true,unique:true,type:DataTypes.STRING},
    Username:{unique:true,type:DataTypes.STRING},
    Password:{unique:false,type:DataTypes.STRING},

},{sequelize , modelName:'users'}
)

class DBControl{
    

    async Login(user,pass){
        const CryptPass = await bcrypt.hash(pass,8);
    
        try{
           
            await sequelize.sync();
            const Login = await Users.findOne({
                where:{
                    Username:user,
                }
            })
            
            const compare = await bcrypt.compare(pass,Login.Password)


            if(compare){
                const token = jwt.Create(Login.id);

                return {msg:'Login With Sucessful',token}

            }else{
                return 'Credencials Invalid'
            }
            
        }catch(e){
            return 'Error' + e
        }

    }

    async Registration(user,pass){
        const CryptPass = await bcrypt.hash(pass,8);
        
        try{
            await sequelize.sync();
            const newUser = await Users.create({
                id:uuid(),
                Username:user,
                Password:CryptPass,
            },(res)=>res)

            const token = jwt.Create(newUser.id);
            

            return {msg:'User Created With Sucessful',token}
        
        }catch(e){
            return {status:504};
        }
    }


    async UserExists(user){
        try{
            await sequelize.sync();
            const SearchUser = await Users.findOne({
                where:{
                    Username:user
                }
            })
            
            return !!SearchUser
        }catch(e){
            return e
        }

    }


    async UserInfo(id){
        try{
            await sequelize.sync();
            const userData = await Users.findOne({
                where:{
                    id:id
                }
            })
            
            if(userData){
                return ({

                    id:userData.id,
                    username:userData.Username,
                    createdAt: userData.createdAt
                })


            }else{
                return ({error:"User not Found"})
            }

            

            
        }catch(e){
            return e
        }
    }
}

const db = new DBControl();



module.exports = DBControl;