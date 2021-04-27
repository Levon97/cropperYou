const axios = require('axios');
const ytdl = require('ytdl-core');

const lang = 'en';
const parser = require('xml2json');

const format = 'xml';

// getting captions from video

async function getCaptions(link) {
  const ytdlinfo = await ytdl.getInfo(link)

  const tracks = ytdlinfo.player_response.captions
    .playerCaptionsTracklistRenderer.captionTracks;

  if (tracks && tracks.length) {

    const track = tracks.find(t => t.languageCode === lang);
    if (track) {

      const res = await axios.get(track.baseUrl);

      const json = parser.toJson(res.data, { object: true });


      return json;

    }
  } else {
    console.log('No captions found for this video');

  }

}



// return all captions from video that contains max 2  words
async function getCutedVideosCaptions(link) {

  const data = await getCaptions(link);
  const subsArray = data.transcript.text

  // checking max words in subb
  cutData = subsArray.filter(text => 
    text.$t.split(" ").length <=3
  )

  console.log(cutData);

}


getCutedVideosCaptions("https://www.youtube.com/watch?v=QRS8MkLhQmM")


module.exports = {
  getTime,
  getCutedVideosCaptions
}





