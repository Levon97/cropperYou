
const Video = require('../model/video')
const configs = require('../configs')

const readline = require('readline');
const fs = require('fs');
const mongoose = require('mongoose')
const path = require('path')

const cp = require('child_process');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const { getCutedVideosCaptions } = require('./captionsCollector')




async function downloadVideo(url) {





  const video = ytdl(url);


  // Print download progress.
  process.stdout.write('downloading video...');
  video.on('progress', (chunkLength, downloaded, total) => {
    const percent = downloaded / total;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`downloading video... ${(percent * 100).toFixed(2)}%`);
  });

  var cuts = await getCutedVideosCaptions(url)

  const db = await mongoose.connect(configs.db.url, configs.db.options);
  console.log('Connection to DB Successful');


  video.pipe(fs.createWriteStream(path.join(__dirname,'..','..','videos','tempVideo','temp.mp4')))
  video.on('finish', async () => {
    for (const iteration of cuts) {

      let output = path.join(__dirname,'..','..','videos','cutedVideos',`${iteration.$t}-${Date.now()}.mp4`);
      let word = iteration.$t

      await DbStorer(word, output)
      console.log(" saved to mongo DB");
      const ffmpegProcess = cp.spawn(ffmpeg, [
        '-y', '-v', 'error',
        '-progress', 'pipe:3',
        '-i', path.join(__dirname,'..','..','videos','tempVideo','temp.mp4'),
        '-vcodec', 'copy', '-acodec', 'copy',
        '-ss', iteration.start, '-t', iteration.dur,
        '-f', 'matroska', 'pipe:4',
      ], {
        windowsHide: true,
        stdio: [
          'inherit', 'inherit', 'inherit',
          'pipe', 'pipe',
        ],
      });

      process.stdout.write('\n');

      ffmpegProcess.stdio[3].on('data', chunk => {
        readline.cursorTo(process.stdout, 0);
        const args = chunk.toString().trim().split('\n')
          .reduce((acc, line) => {
            let parts = line.split('=');
            acc[parts[0]] = parts[1];
            return acc;
          }, {});
        process.stdout.write(`cutting video... ${args.progress}${' '.repeat(3)}`);
      });



      ffmpegProcess.stdio[4].pipe(fs.createWriteStream(output));
      ffmpegProcess.on('close', async () => {
        process.stdout.write(`\nsaved to ${output}\n`);

      })
    }

    await db.disconnect();
    console.log(" DB disconnecting");

  });

}



function videoStorer() {
  return new Promise((resolve, reject) => {

  })
}





async function DbStorer(word, path) {


  const video = new Video({
    word: word,
    path: path,

  });

  try {
    const saveVideo = await video.save();
  } catch (error) {

    console.log(error)
  }
}




module.exports = {

  downloadVideo
}

console.log();