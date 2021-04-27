const searchVideos = require('./searchUrl.js')

var opts = {
  maxResults: 23,
  relevanceLanguage: "en",
  type: "video",
  videoCaption: "any",
  key: 'AIzaSyAyDW1r3EmEznzPGQiiZNz391LWAKAPQpA'

};

async function gag(text, opts) {
  const videos = await searchVideos(text, opts)
  const urls = videos.map(video => video.link);
  return urls;
}
