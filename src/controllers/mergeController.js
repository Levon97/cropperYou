const fluent_ffmpeg = require("fluent-ffmpeg");
const glob = require("glob");
const wordsArr = require('../public/js/getUserWords')
const fs = require('fs');
const Video = require("../model/video")







async function merger(req, res) {

    try {
        console.log(wordsArr);
        // const words = wordsArr()
        const words = ["in English", "native speaker", "harpac", "gagulcho"]
        const videosData = [];
        const videos = await Video.find()
        for (const word of words) {
            let path = videos.find(x => x.word.includes(word))

            if (path === undefined) {
                continue;
            }
            videosData.push(path)





        }
        const paths = videosData.map(x => x.path)

        let mergedVideo = fluent_ffmpeg();

        

     
        
        paths.forEach((path)=> {
            mergedVideo = mergedVideo.addInput(path);
        });

        //need to download ffmpeg(ffprob) for this
        mergedVideo.mergeToFile(`${__dirname}/mergedVideos.mp4`, './tmp/')
            .on('error', function (err) {
                console.log('Error ' + err.message);
            })
            .on('end', function () {
                console.log('Finished!');
                res.download(`${__dirname}/mergedVideos.mp4`)
            });


        //  res.send(paths)

    } catch (error) {
        console.error()
        res.status(400).json({ error });
    }
}


module.exports = {
    merger
}