var express = require('express')
var app = express()
const path = require('path');
const port = 3001
const Posting = require('./posting')

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})


const rp = require('request-promise');
const $ = require('cheerio');

const url = 'https://boston.craigslist.org/search/sss?query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1&sort=rel'

let getImage = (dataId,size) => {
/*sizes:
50x50
300x300
600x450
*/
let images = (parseDataId(dataId))
// return images.map((image) => {
  return `<img src = "https://images.craigslist.org/${images[0]}_300x300.jpg">`
// })
}

let parseDataId = (dataId)=> {
  let imageArray = dataId.split(",")
  imageArray = imageArray.map((imageId) => {
    return (imageId.split(":")[1])
  })
  return imageArray
}

app.get('/doit', function (req, res) {

  let resultItems = []
  rp(url) // returns a promise
    .then(function(html){
      let header = "<html lang='en' dir='ltr'><head><meta charset='utf-8'><title>api access</title></head><body>hello world!"
      resultItems.push(header)
      $('.result-row', html).each(function(index) {
         resultItems.push($(this).html())
         let dataIdString = $(this).find('a').attr('data-ids')
         let title = $(this).find('.result-title').text()
         let price = $(this).find('.result-price').first().text()
         let location = $(this).find('.result-hood').text() || "No Location"
         let link = $(this).find('.result-title').attr('href')
         // console.log( title, price, location, link, dataIdString)
         let newObject = new Posting(dataIdString,title,price,location,link)
         newObject.printAttrs()
         // let description =
         // resultItems.push(getImage())
         // let firstImage = `<img src = "https://images.craigslist.org/${}_300x300.jpg">`
      })
      resultItems.push("</body></html>")
      res.send(resultItems.join("") )
    })
    .catch(function(err){
      //handle error
      console.log(err)
      res.send(`an error occurred ${err}`)
    })
})

// serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
