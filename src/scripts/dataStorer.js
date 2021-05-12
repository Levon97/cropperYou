const urls = require('./searchUrl.js')
const {videoDownloader, cutter } = require('./videoDownloader')
const mongoose = require('mongoose');
const { getCutedVideosCaptions } = require('./captionsCollector')
const path = require('path');
const configs = require('../configs')
const Video = require('../model/video')

// Main job for collectiong and saveing to Fs and MongoDb
async function job() {
  const url = await urls("american psycho");
  const  dbData= await dataCreator(url);
  await saveCutsToFs(url, dbData);
  await connectionDb(dbData);
}

job();

// generateing paths by Data and word and storeing  in array with words
async function dataCreator(url) {
  const captions = await getCutedVideosCaptions(url);
  let dbData = []
  for (const iterator of captions) {
    dbData.push({
      start: Number(iterator.start),
      dur: Number(iterator.dur),
      word: iterator.$t,
      path: path.resolve(`cutedVideos`, `${iterator.$t}_${Date.now()}.mp4`)
    })
  }
  return dbData ;
}

// saveing cuts from video to Fs
async function saveCutsToFs(url, dbData) {
  await videoDownloader(url)
  for (const iterator of dbData) {
    await cutter(iterator.start, iterator.dur, iterator.path)
  }
}

// saveing data to mongo Db
async function saveVideosDataToDb(dbData) {
  const videosData = dbData.map(video=>video = {word:video.word, path: video.path})
  try {
      for (videoData of videosData) {
          let video = new Video(videoData);
          await video.save();
      }
  } catch (error) {
      console.log(error);
  }
}

async function connectionDb(dbData) {
  try {
      const db = await mongoose.connect(configs.db.url, configs.db.options);
      console.log('Connection to DB Successful');

      await saveVideosDataToDb(dbData);
      console.log("videos saved to Mongo DB");

      await db.disconnect();
       process.exit(0);
      
  } catch (error) {
      console.log(error);
  }
};
