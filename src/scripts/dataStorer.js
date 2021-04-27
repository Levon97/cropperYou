const  searchVideos = require('./searchUrl.js')

var opts = {
    maxResults: 1,
    key: 'AIzaSyAyDW1r3EmEznzPGQiiZNz391LWAKAPQpA'

  };

async function gag(text,opts){
    const videos = await searchVideos(text,opts)
    const urls =  videos.map(video=>video.link);
    return urls;
}

gag("marvel",opts)