
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

async function callbackForYoutube(err, res) {

  if (err) {
    console.error(err);
    throw err;
  }
  const arrOfVideos = await res.data.items;

  console.log(res.data.items);

}

youtube.search.list(params, callbackForYoutube );


