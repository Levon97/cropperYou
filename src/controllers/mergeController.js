const fluent_ffmpeg = require("fluent-ffmpeg");
const wordsArr = require('../public/js/getUserWords');
const Video = require("../model/video");
const path  = require('path');

const mergedVideosPath = path.join(__dirname,'..','..','mergedVideo','mergedVideo.mp4')




// creating video by inputed  words
async function merger(req, res) {

    try {
         console.log(req.body);

        // const words = wordsArr()
        
        const words = [ "look", "point", "random"]
        const videosData = [];
        const videos = await Video.find()
        for (const word of words) {
            let reqVideos = videos.find(x => x.word.includes(word))

            if (reqVideos === undefined) {
                continue;
            }
            videosData.push(reqVideos)

        }

        
        const paths = videosData.map(x => x.path)
        let mergedVideo = fluent_ffmpeg();
        console.log(paths);


        paths.forEach((path) => {
            mergedVideo = mergedVideo.addInput(path);
        });

        console.log(videosData);

        //need to download ffmpeg(ffprob) for this
        mergedVideo.mergeToFile(mergedVideosPath, './tmp/')
            .on('error', function (err) {
                console.log('Error ' + err.message);
            })
            .on('end', function () {
                console.log('Finished!');
                res.download(mergedVideosPath)
            });


    } catch (error) {
        console.error()
        res.status(400).json({ error : "400" });
    }
}


module.exports = {
    merger
}