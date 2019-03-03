var express = require('express')
var app = express()
const path = require('path');
const port = 3000

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

// serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
