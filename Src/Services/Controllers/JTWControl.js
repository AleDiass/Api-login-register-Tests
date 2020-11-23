const jwt = require('jsonwebtoken');

const jwtKey = 'CE37FC102064B2ACD151D8E30982410F1'

class Jwt{

    Create(id){
        const token = jwt.sign({data:id},jwtKey,{expiresIn:'1h'})
       
        return token
    }

    verifyToken(token){
        const tokenverify = jwt.verify(token,jwtKey)
        return tokenverify
        
    }
}


module.exports = Jwt;

