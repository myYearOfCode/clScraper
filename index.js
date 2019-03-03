var express = require('express')
var app = express()
const path = require('path');
const port = 3001

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})


const rp = require('request-promise');
const $ = require('cheerio');

const url = 'https://boston.craigslist.org/search/sss?query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1&sort=rel'

app.get('/doit', function (req, res) {

  let resultItems = []
rp(url) // returns a promise
  .then(function(html){
    //success!
    //this is how you save the results in an array
    let header = "<!DOCTYPE html><html lang='en' dir='ltr'><head><meta charset='utf-8'><title></title></head<body>"
    resultItems.push(header)
    $('.rows', html).each(function(index) {
      resultItems.push($(this).html())
    })
    resultItems.push("</body></html>")
    console.log(resultItems)
    return resultItems
  })
  .catch(function(err){
    //handle error
    console.log(err)
  })
  res.send(resultItems )
})

// serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
