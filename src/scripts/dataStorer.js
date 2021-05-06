const urls = require('./searchUrl.js')
const { downloadVideo } = require('./videoDownloader')




async function dataStorer() {
  const url = await urls("legion 5");
  console.log(url);
  await downloadVideo(url)
  
    
    
   
}
dataStorer()




