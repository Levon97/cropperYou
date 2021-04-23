

const readline = require('readline');
const fs = require('fs');
const cp = require('child_process');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');

const { getTime } = require('./captionsCollector');
const { start } = require('repl');

const url = 'https://www.youtube.com/watch?v=T91p6pTPpSY';
// const output = `${__dirname}/videos/CutVideo.mkv`;

const video = ytdl(url);

// Print download progress.
process.stdout.write('downloading video...');
video.on('progress', (chunkLength, downloaded, total) => {
  const percent = downloaded / total;
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(`downloading video... ${(percent * 100).toFixed(2)}%`);
});

async function downloadVideo(word) {

  const output = `${__dirname}/videos/${word}-${Date.now()}.mkv`;
  const startDur = await getTime(url, word)

  

   video.pipe(fs.createWriteStream(`${__dirname}/videos/temp.mkv`))
   .on( 'finish', () => {
    const ffmpegProcess = cp.spawn(ffmpeg, [
      '-y', '-v', 'error',
      '-progress', 'pipe:3',
      '-i', `${__dirname}/videos/temp.mkv`,
      '-vcodec', 'copy', '-acodec', 'copy',
      '-ss',startDur.start, '-t', startDur.dur,
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
    /*
    */ffmpegProcess.on('close', () => {
      process.stdout.write(`\nsaved to ${output}\n`);
      try {
        fs.unlinkSync(`${__dirname}/videos/temp.mkv`)
        //file removed
      } catch (err) {
        console.error(err)
      }
    });

    ffmpegProcess.stdio[4].pipe(fs.createWriteStream(output));
  });
}


downloadVideo("I");






