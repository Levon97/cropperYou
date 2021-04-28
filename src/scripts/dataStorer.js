const urls = require('./searchUrl.js')
const { downloadVideo } = require('./videoDownloader')



function dataStore(keyword) { }

async function gag() {
  const urlsArr = await urls(" ");
  console.log(urlsArr);
  for (const gul of urlsArr){
    await downloadVideo(gul)
  }
}
gag()


