const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
// const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const url = 'https://www.craigslist.org/about/sites'
//https://vermont.craigslist.org/search/sss?sort=rel&query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1
//https://maine.craigslist.org/search/sss?sort=rel&query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1

// rp(url) // returns a promise
//   .then(function(html){
//     //success!
//
//     // this is how you iterate over a result
//     // $('.result-row', html).each(function(index) {
//     //   console.log($(this).html())
//     // })
//
//     //this is how you save the results in an array
//     let resultItems = []
//     let header = "<!DOCTYPE html><html lang='en' dir='ltr'><head><meta charset='utf-8'><title></title></head<body>"
//     resultItems.push(header)
//     // $('.result-row', html).each(function(index) {
//     $('.rows', html).each(function(index) {
//       resultItems.push($(this).html())
//     })
//     // resultItems.forEach((each) => {
//     //   console.log("\n/////////////////////////")
//     //   console.log(each);
//     //   console.log("/////////////////////////\n")
//     // })
//     resultItems.push("</body></html>")
//     console.log(resultItems)
//     fs.writeFile('/Users/rossdaly/google_drive/projects/clScraper/2pac.html', resultItems, (err) => {
//     // throws an error, you could also catch it here
//     if (err) throw err;
//
//     // success case, the file was saved
//     console.log('Lyric saved!');
//     });
//   })
//   .catch(function(err){
//     //handle error
//     console.log(err)
//   });
rp(url) // returns a promise
  .then(function(html){
    console.log('hi')
    // this is how you iterate over a result
    // $('.result-row', html).each(function(index) {
    //   console.log($(this).html())
    // })

    let resultItems = []
    // let header = "<!DOCTYPE html><html lang='en' dir='ltr'><head><meta charset='utf-8'><title></title></head<body>"
    // resultItems.push(header)
    // console.log($('.colmask', html).first().html())
    let colmask = ($('.colmask', html).first())
    // console.log(colmask)
    let headers = $('h4', colmask).html()
    console.log((headers))
    // headers.each( header => {
    //   console.log(typeof(header))
    // })
      // console.log(headers[1])
      // console.log(headers.length)
      console.log(typeof(headers));
    // })
    // .each(function(index) {
    //   resultItems.push($(this).html())
    // })
  })
  .catch(function(err){
    //handle error
    console.log(err)
  });

/*
<<<backend>>>
apis - eventually an auth will be required for access. not now.
one that scrapes a term(s) on a cl site. optional arg for number of pages.
one api that scrapes the surrounding cities.
one that serves up one posting at a time.


<<frontend>>
grab the listings from more than one site from the backend.
  receive an array of divs with each one containing one ad.
  a react element displays them
    and eventually includes a button to hide each one

for 'cl sites menu' grab the city prefixes from the backend.
store terms and cities and blocks in localstorage

make a data structure that has the content from each thumbnail stored in it.
<<future>>
cache results so that it doesn't hit every site every time you click on a post and then return. OR dont change the page, show the post in a large popup.
make a manual refresh button.
add thumbnails of the images within
<<never>>
the post on the main page? NO, because that would cause traffic to go waaaay up.
*/
