const axios = require('axios');
const ytdl = require('ytdl-core');

const lang = 'en';


const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Can be xml, ttml, vtt, srv1, srv2, srv3
const format = 'xml';

// getting captions from video

async function getCaptionsXml(link) {
  const ytdlinfo = await ytdl.getInfo(link)

  const tracks = ytdlinfo.player_response.captions
    .playerCaptionsTracklistRenderer.captionTracks;

  if (tracks && tracks.length) {

    const track = tracks.find(t => t.languageCode === lang);
    if (track) {

      const k = await axios.get(track.baseUrl);


      return k.data;

    }
  } else {
    console.log('No captions found for this video');

  }

}




// get data from xml captions by link and specific containing word

async function getTime(link, word) {

  const xml = await getCaptionsXml(link);

  const xmlDoc = new JSDOM(xml, {
    contentType: "text/xml"
  });

  const arr = xmlDoc.window.document.getElementsByTagName('text');

  const length = arr.length

  for (let i = 0; i < length; i++) {
<<<<<<< HEAD:src/scripts/captionsCollector.js

    if (arr[i].innerHTML.includes(word)) {

=======

    if (arr[i].innerHTML.includes(word)) {
>>>>>>> 183bad2b924d38072dab1ea910800de3e24d91f4:scripts/captionsCollector.js
      
      return {
        start: arr[i].getAttribute("start"),
        dur: arr[i].getAttribute("dur")
      };

    }

  }
}



async function getCutedVideos(link) {

  const xml = await getCaptionsXml(link);

  const xmlDoc = new JSDOM(xml, {
    contentType: "text/xml"
  });

  const arr = xmlDoc.window.document.getElementsByTagName('text');

  const length = arr.length
  const cuttingData = [];

  for (i = 0; i < length; i++) {

    if (arr[i].innerHTML.split(" ").length <= 4) {

      let obj = {
        name: arr[i].innerHTML,
        start: arr[i].getAttribute("start"),
        dur: arr[i].getAttribute("dur")
      }

      cuttingData.push(obj)
    };

  }

  console.log(cuttingData);

}



getCutedVideos("https://www.youtube.com/watch?v=QRS8MkLhQmM")


module.exports = {
  getTime
}





