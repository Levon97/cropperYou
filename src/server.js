const express = require('express');
const mongoose = require('mongoose');
const configs = require('./configs.js')
const controller=require("./controllers/mergeController")
const path = require("path");
const HOST = '0.0.0.0';

const app = express();
app.use(express.static( './src/public'));

app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname + '/public/html/index.html'))
     
     //res.redirect('/download')
    // res.send("hello")
});



app.post('/download', function(req, res){
    controller.merger(req,res);
    const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
    res.download(file); // Set disposition and send it.
    res.redirect("/")
  });



(async () => {
    try {
        await mongoose.connect(configs.db.url, configs.db.options);
        console.log('Connection to DB Successful');
        app.listen(configs.env.PORT,HOST, () => {
            console.log(`Server is running ${configs.env.PORT}`);
          });
    } catch (err) {
        console.log('Connection to DB Failed');
    }
})();


// (async () => {
//   console.log('Connection to DB Successful');
//   app.listen(3050, () => {
//       console.log(`Server is running ${port}`);
//     });
// })();

