const db = {
    url: 'mongodb+srv://levon:dbUserFeanor@projectx.0vbdk.mongodb.net/reposDb?retryWrites=true&w=majority',
    options: {useNewUrlParser: true, useUnifiedTopology: true}
  }; 


const env ={
    PORT: process.env.PORT || 3000
  };


 module.exports = { 
     db,
     env
 }