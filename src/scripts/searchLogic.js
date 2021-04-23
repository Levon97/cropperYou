  
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



youtube.search.list(params, (err, res) => {
  if (err) {
    console.error(err);
    throw err;
  }
  const arrOfVideos = res.data.items;
  
  console.log(res.data.items);
});


