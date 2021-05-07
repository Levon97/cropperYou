
const Video = require('../model/video')
const readline = require('readline');
const fs = require('fs');
const path = require('path')
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg')


// Downloading video from youtube
function videoDownloader(link) {

  return new Promise((resolve, reject) => {
    const streamForTemp = fs.createWriteStream(path.resolve('..', '..', 'tempVideo', 'temp.mp4'))
    const video = ytdl(link)
    process.stdout.write('downloading video...')

    video.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`downloading video... ${(percent * 100).toFixed(2)}%`);
    })
      .pipe(streamForTemp)
      .on('error', function (err) {
        console.log('error: ', err)
      })
      .on('close', function (err) {
        resolve()
        if (!err) { console.log(' Download done') }
      })

  })
}

// cutting video by start and duration 
function cutter(start, dur,cutedVideoPath) {
  
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path.resolve('..', '..', 'tempVideo', 'temp.mp4'))
    ffmpeg(readStream)
      .setStartTime(start)
      .setDuration(dur)
      .save(cutedVideoPath)
      .on('error', function (err) {
        console.log('error: ', err)
      })
      .on('end', function (err) {
        resolve()
        if (!err) { console.log('Video cut Save to file system'); }
      });
      
  });
}

module.exports = {
  cutter,
  videoDownloader
}