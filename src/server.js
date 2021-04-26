const express = require('express');
const mongoose = require('mongoose');
const configs = require('./configs.js')
const path = require("path");


const app = express();
app.use(express.static( 'public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));

});



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


// (async () => {
//   console.log('Connection to DB Successful');
//   app.listen(3050, () => {
//       console.log(`Server is running ${port}`);
//     });
// })();

