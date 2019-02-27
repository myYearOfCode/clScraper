const express = require('express');
const path = require('path');

const app = express();
const myModule = require('./clScraper');
let val = myModule.getDivs(); // val is "Hello"
console.log(val)

// serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// an api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(val);
  // val = myModule.getDivs()
  // .then((val) => {
  //   res.json(myModule.getDivs())
  //   console.log('sent list of items');
  // })
});

// handles any requests that don't match the ones above
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
