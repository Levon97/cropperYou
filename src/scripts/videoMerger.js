// const fluent_ffmpeg = require("fluent-ffmpeg");
// const glob = require("glob");


// let mergedVideo = fluent_ffmpeg();

// let videoNames = glob.sync(`${__dirname}/videos/*.mkv`);

// fluent_ffmpeg.setFfprobePath(process.env.FFPROBE_PATH)
// fluent_ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH)

// console.log(process.env.FFMPEG_PATH);
// console.log(process.env.FFPROBE_PATH);
// //let videoNames = ['./videos/countries  1618861334111.mkv', './videos/countries-1618861453373.mkv'];
// console.log(videoNames)
// //console.log(process.env);

// videoNames.forEach(function(videoName){
//     mergedVideo = mergedVideo.addInput(videoName);
// });

// //need to download ffmpeg(ffprob) for this
// mergedVideo.mergeToFile(`${__dirname}/videos/mergedVideos.mkv`, './tmp/')
// .on('error', function(err) {
//     console.log('Error ' + err.message);
// })
// .on('end', function() {
//     console.log('Finished!');
// });




const fluent_ffmpeg = require("fluent-ffmpeg");

var mergedVideo = fluent_ffmpeg();
var videoNames = ['/home/levon/cropperYou/src/scripts/videos/in English-1619820880488.mp4', '/home/levon/cropperYou/src/scripts/videos/with I&#39;m-1619820880570.mp4'];



videoNames.forEach(function(videoName){
    mergedVideo = mergedVideo.addInput(videoName);
});

mergedVideo.mergeToFile('./mergedVideo.mp4', './tmp/')
.on('error', function(err) {
    console.log('Error ' + err.message);
})
.on('end', function() {
    console.log('Finished!');
});