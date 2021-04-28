

const readline = require('readline');
const fs = require('fs');
const cp = require('child_process');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const { getCutedVideosCaptions } = require('./captionsCollector')




async function downloadVideo(url) {

  
    const video =  ytdl(url);


    // Print download progress.
     process.stdout.write('downloading video...');
     video.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`downloading video... ${(percent * 100).toFixed(2)}%`);
    });

    const cuts = await getCutedVideosCaptions(url)
    console.log(cuts);

    video.pipe(fs.createWriteStream(`${__dirname}/videos/temp.mp4`))
    
    video.on('finish', () => {
      for (i = 0; i < cuts.length; i++) {
        const output =  `${__dirname}/videos/-${Date.now()}.mp4`;
        const ffmpegProcess =  cp.spawn(ffmpeg, [
          '-y', '-v', 'error',
          '-progress', 'pipe:3',
          '-i', `${__dirname}/videos/temp.mp4`,
          '-vcodec', 'copy', '-acodec', 'copy',
          '-ss', cuts[i].start, '-t', cuts[i].dur,
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

        if (i === (cuts.length - 1)) {
          ffmpegProcess.on('close', () => {
            process.stdout.write(`\nsaved to ${output}\n`);
            // try {
            //   fs.unlinkSync(`${__dirname}/videos/temp.mkv`)
            //   //file removed
            // } catch (err) {
            //   console.error(err)
            // }
          })
        }


      }


    });

  }


function downloadInfo(video) {


  // Print download progress.
  process.stdout.write('downloading video...');
  video.on('progress', (chunkLength, downloaded, total) => {
    const percent = downloaded / total;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`downloading video... ${(percent * 100).toFixed(2)}%`);
  });
}



module.exports = {
  downloadVideo
}



