### Simple Rest API  Login / Register With SQLite3 
  - ##### Created with: 
    
    - Express 
    - Jwt Token
    - Bcrypt
    - Sequelize
    - sqlite3

- #####  How to Use:
- Forks or Clone this Repository and Open the Server with node  
- Open your Insomnia or Postman and send Request In Json Like the Exemples :
   - ###### Login : Route "http://localhost:3000/login" 
            Method:Post
            JSON: {
                "user":"teste123",
                "pass":"mypass123", 
            }
    - ###### Register:Route "http://localhost:3000/register"
            Method:Post
            JSON :{
                "user":"hello123",
                "pass":"123",
                "passverify":"123",
                }
    - ###### Jwt in Header : You need send a 'Authorization key with Jwt token In Value' Route : "http://localhost:3000/CheckAuth" 
             Method:Get




- this is a simple project to show my abilities  , Sorry  for the mistakes
