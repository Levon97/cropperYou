
const { google } = require('googleapis');


const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyAmZvP-mB_82wcwS0PZ3Pn2gf8RZOOKLP4'
});

const params = {
  part: 'snippet',
  maxResults: 1,
  relevanceLanguage: "en",
  type: "video",
  videoCaption: "any"



};

const search = require('youtube-search');

var opts = {
  maxResults: 1,
  key: 'AIzaSyAyDW1r3EmEznzPGQiiZNz391LWAKAPQpA'
};

search('jsconf', opts, function(err, results) {
  if(err) return console.log(err);

  // console.dir(results);
});



module.exports = function(text,opts){
  return new Promise ((resolve,reject)=>{
    search(text, opts, function(err, results) {
      if(err) return reject(err);
    
      resolve(results);
    })
  })
}