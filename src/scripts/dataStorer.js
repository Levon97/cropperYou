const urls = require('./searchUrl.js')
const { downloadVideo } = require('./videoDownloader')




async function dataStorer() {
  const url = await urls("netflix");
  console.log(url);
  await downloadVideo(url)
  
    
    
   
}
dataStorer()




