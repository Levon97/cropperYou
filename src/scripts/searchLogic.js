var search = require('youtube-search');

var opts = { 
  maxResults: 10,
  key: "AIzaSyAmZvP-mB_82wcwS0PZ3Pn2gf8RZOOKLP4",
  relevanceLanguage: "en",
  type: "video",
  videoCaption: "any"

};

search( " ", opts, function(err, results) {
  if(err) return console.log(err);

  console.dir(results);
});