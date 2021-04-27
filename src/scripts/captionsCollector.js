const axios = require('axios');
const ytdl = require('ytdl-core');

const lang = 'en';
var parser = require('xml2json');

var xml = "<foo attr=\"value\">bar</foo>";
console.log("input -> %s", xml)

// xml to json
var json = parser.toJson(xml);
console.log("to json -> %s", json);

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

      const res = await axios.get(track.baseUrl);

      console.log(track.baseUrl)

      var json = parser.toJson(res.data);

    console.log(json);
      return json;

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

    if (arr[i].innerHTML.includes(word)) {


      return {
        start: arr[i].getAttribute("start"),
        dur: arr[i].getAttribute("dur")
      };

    }

  }
}



async function getCutedVideosCaptions(link) {

  const xml = await getCaptionsXml(link);

  const xmlDoc = new JSDOM(xml, {
    contentType: "text/xml"
  });

  const arr = xmlDoc.window.document.getElementsByTagName('text');

  const length = arr.length
  const cuttingData = [];

  for (i = 0; i < length; i++) {

    if (arr[i].innerHTML.split(" ").length <= 2) {

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


 getCaptionsXml("https://www.youtube.com/watch?v=QRS8MkLhQmM")


module.exports = {
  getTime,
  getCutedVideosCaptions
}





