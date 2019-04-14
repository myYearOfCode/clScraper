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

app.get('/query_test', function (req, res) {
  console.log(req.query)
  res.send(req.query.query)
})

let blocked = ['6825381358','6819957875','6043518208'] // replace with db or file

/////////
// MAKING THE CLOSEST CITIES ARRAY
let closestCities = {}
app.get('/nearby/', function (req, res) {
  let main_city=req.query.city
  console.log(main_city)
  rp('https://maine.craigslist.org/')
  .then(function(html){
    $('.acitem', html).first().find('a').each(function(item) {
      let urlPrefix=$(this).attr('href').split('.')[0].split('//')[1]
      let displayName = $(this).text()
      closestCities[urlPrefix] = displayName
    })
    console.log(closestCities)
    res.send(closestCities)
  })
  .catch(function(err){
    console.log(err)
    res.send(`an error occurred ${err}`)
  })
})
////////


app.get('/api/', function (req, res) {
  let results = {}
  let cities = req.query.cities.split(',')
  cities.forEach((base, index) => {
    rp(`https://${base}.craigslist.org/search/sss?query=${req.query.search}`)
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
             // console.log(`new object created`);
        })
        if (index === cities.length-1){ // if we are at the end of the url list
          // console.log(`sending response now`);
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
