var express = require('express')
var cors = require('cors');
var app = express()
const path = require('path');
const port = 3001
const Posting = require('./posting')
var db = require('diskdb');
db = db.connect('./db/', ['diskDb']);

//setup CORS whitelist
// Set up a whitelist and check against it:
var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// setup CORS before the routes are set up:
app.use(cors());
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})


const rp = require('request-promise');
const $ = require('cheerio');

const urls = ['https://vermont.craigslist.org/search/sss?sort=rel&query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1',
'https://boston.craigslist.org/search/sss?query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1&sort=rel',
'https://maine.craigslist.org/search/sss?sort=rel&query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1']

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

let blocked = ['6825381358','6819957875','6043518208'] // replace with db or file

// block list should be client side ideally.
// let updateBlocked = (toBlock) => {
//   blocked.push(toBlock)
// }

app.get('/doit', function (req, res) {
  // https://www.npmjs.com/package/diskdb
  // let blocked = db.diskDb.find();
  // if (blocked.length < 20) {
  //   var blocked = {
  //     "6825381358" : "6825381358",
  //     "68253813580" : "68253813580",
  //     "68253813589" : "6825381358"'
  //   }
  // db.diskDb.save(blocked);
  // }
  let resultItems = []
  let results = {}
  let header = `<html lang='en' dir='ltr'><head><meta charset='utf-8'><title>api access</title>    <link href="https://fonts.googleapis.com/css?family=Pacifico|Quicksand|Roboto" rel="stylesheet"><link rel='stylesheet' href='./style/style.css'></head><body><div class = "wrapper">`
  resultItems.push(header)
  urls.forEach((url, index) => {
    rp(url) // returns a promise
      .then(function(html){


        $('.result-row', html).each(function(index) {
           // resultItems.push($(this).html())

           let dataIdString = $(this).find('a').attr('data-ids')
           let title = $(this).find('.result-title').text()
           let price = $(this).find('.result-price').first().text()
           let location = $(this).find('.result-hood').text() || "No Location"
           let link = $(this).find('.result-title').attr('href')
           let dataPid = $(this).attr('data-pid')
           let repostPid = $(this).attr('data-repost-of')
           let newObject = new Posting(
             dataIdString,
             title,
             price,
             location,
             link,
             blocked,
             dataPid,
             repostPid)
             results[dataPid] = newObject
           resultItems.push(newObject.display(updateBlocked))
        })
      if (index === urls.length-1){ // if we are at the end of the list
        resultItems.push("</div></body></html>")
        res.send(resultItems.join("") )
        console.log(JSON.stringify(results)) // this is for the node api version.
      }
      })
      .catch(function(err){
        //handle error
        console.log(err)
        res.send(`an error occurred ${err}`)
      })
  })

})

app.get('/getData', function (req, res) {
  // let resultItems = []
  let results = {}
  urls.forEach((url, index) => {
    rp(url) // returns a promise
      .then(function(html){
        $('.result-row', html).each(function(index) {
           let dataIdString = $(this).find('a').attr('data-ids')
           let title = $(this).find('.result-title').text()
           let price = $(this).find('.result-price').first().text()
           let location = $(this).find('.result-hood').text() || "No Location"
           let link = $(this).find('.result-title').attr('href')
           let dataPid = $(this).attr('data-pid')
           let repostPid = $(this).attr('data-repost-of')
           let newObject = new Posting(
             dataIdString,
             title,
             price,
             location,
             link,
             blocked,
             dataPid,
             repostPid)
             results[dataPid] = newObject
        })
      if (index === urls.length-1){ // if we are at the end of the url list
        res.send((results)) // this is for the node api version.
      }
      })
      .catch(function(err){
        //handle error
        console.log(err)
        res.send(`an error occurred ${err}`)
      })
  })

})
// serve the static files from the React app

// this is dangerous and will have to be removed when the react part is built
app.use(express.static(__dirname));

/////// kee pthis and enable for react
// app.use(express.static(path.join(__dirname, 'client/build')));
///////

app.listen(port, () => console.log(`Express backend listening on port ${port}!`))
