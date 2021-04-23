const express = require('express');
const mongoose = require('mongoose');
const configs = require('./configs.js')
const app = express();






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

