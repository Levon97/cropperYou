const search = require('youtube-search');



 // get videoData by keyword
 function mySearch(keyword){
  const opts = {
    maxResults: 2,
    relevanceLanguage: "en",
    type: "video",
    videoCaption: "closedCaption",
    key: 'AIzaSyAyDW1r3EmEznzPGQiiZNz391LWAKAPQpA'
    
  
  };

  return new Promise ((resolve,reject)=>{
    search(keyword, opts, function(err, results) {
      if(err) return reject(err);
    
      resolve(results);
    })
  })
}

// exporting function thats give urls by search keyword
module.exports = async function(keyword) {
  const videos = await mySearch(keyword)
  const urls = videos.map(video => video.link);
  return urls[0];
}