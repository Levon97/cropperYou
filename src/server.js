const express = require('express');
const mongoose = require('mongoose');
const configs = require('./configs.js');
const {merger}=require("./controllers/mergeController");
const app = express();

app.use(express.static( './src/public'));
const path = require('path');

app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname + '/public/html/index.html'))
     
    
});
app.post('/download', merger);



(async () => {
    try {
        await mongoose.connect(configs.db.url, configs.db.options);
        console.log('Connection to DB Successful');
        app.listen(configs.env.PORT, () => {
            console.log(`Server is running ${configs.env.PORT}`);
          });
    } catch (err) {
        console.log('Connection to DB Failed');
    }
})();



