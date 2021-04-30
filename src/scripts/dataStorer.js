const urls = require('./searchUrl.js')
const { downloadVideo } = require('./videoDownloader')
const { getCutedVideosCaptions } = require('./captionsCollector')
const mongoose = require('mongoose')
const configs = require('../configs')


function dataStore(keyword) { }

async function gag() {
  const url = await urls("english");
  console.log(url);
  
  
  
    await downloadVideo(url)
  
    
    
   
}
gag()




