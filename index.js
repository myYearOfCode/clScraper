var express = require('express')
var cors = require('cors');
var app = express()
const path = require('path');
const port = 3001
const Posting = require('./posting')
var db = require('diskdb');
db = db.connect('./db/', ['diskDb']);
const rp = require('request-promise');
const $ = require('cheerio');

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
app.use(cors(whitelist));

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', function (req, res) {
//   res.send('hello world')
// })

// app.get('/query_test', function (req, res) {
//   console.log(req.query)
//   res.send(req.query.query)
// })

const urls = ['https://vermont.craigslist.org/search/sss?sort=rel&query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1',
'https://boston.craigslist.org/search/sss?query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1&sort=rel',
'https://maine.craigslist.org/search/sss?sort=rel&query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1']

url_bases=['vermont', 'boston', 'maine']

let blocked = ['6825381358','6819957875','6043518208'] // replace with db or file

app.get('/api/', function (req, res) {
  let results = {}
  url_bases.forEach((base, index) => {
    rp(`https://${base}.craigslist.org/search/sss?query=${req.query}`) // returns a promise
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

app.get('/getData', function (req, res) {
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
// app.use(express.static(__dirname));

/////// keep this and enable for react
app.use(express.static(path.join(__dirname, 'client/public')));
///////

app.listen(port, () => console.log(`Express backend listening on port ${port}!`))
