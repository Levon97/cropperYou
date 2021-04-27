const search = require('youtube-search');




module.exports = function(text,opts){
  return new Promise ((resolve,reject)=>{
    search(text, opts, function(err, results) {
      if(err) return reject(err);
    
      resolve(results);
    })
  })
}