const fluent_ffmpeg = require("fluent-ffmpeg");
const glob = require("glob");


let mergedVideo = fluent_ffmpeg();

let videoNames = glob.sync(`${__dirname}/videos/*.mkv`);

fluent_ffmpeg.setFfprobePath(process.env.FFPROBE_PATH)
fluent_ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH)

console.log(process.env.FFMPEG_PATH);
console.log(process.env.FFPROBE_PATH);
//let videoNames = ['./videos/countries  1618861334111.mkv', './videos/countries-1618861453373.mkv'];
console.log(videoNames)
//console.log(process.env);

videoNames.forEach(function(videoName){
    mergedVideo = mergedVideo.addInput(videoName);
});

//need to download ffmpeg(ffprob) for this
mergedVideo.mergeToFile(`${__dirname}/videos/mergedVideos.mkv`, './tmp/')
.on('error', function(err) {
    console.log('Error ' + err.message);
})
.on('end', function() {
    console.log('Finished!');
});