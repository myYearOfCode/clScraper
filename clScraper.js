const rp = require('request-promise');
const $ = require('cheerio');
// const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const url = 'https://boston.craigslist.org/search/sss?query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1&sort=rel'
//https://vermont.craigslist.org/search/sss?sort=rel&query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1
//https://maine.craigslist.org/search/sss?sort=rel&query=yuba+%7C+%22big+dummy%22+%7C+%22cargo+bike%22+%7C+xtracycle+%7C+cetma+%7C+bullitt+%7C+babboe+%7C+metrofiets&excats=69-53-23-1-14-3-32-1

rp(url) // returns a promise
  .then(function(html){
    //success!
    // console.log(html)
    console.log($('.result-row', html).length)
    // console.log($('.result-row', html)) // this outputs a useful hash of data.
    let postResults = $('.result-row', html)
    let titleResults = $('.result-row > a', html)
    console.log($('.result-row > a', html).text())
    for (let i = 0; i < postResults.length; i++){
      console.log(`/////////////////////`);
      // console.dir(postResults[Object.keys(postResults)[i]]['attribs']['data-pid'])
      // console.log(titleResults[Object.keys(postResults)[i]])
      // console.dir(postResults[Object.keys(postResults)[i]])
      console.log(`/////////////////////`);
    }
  })
  .catch(function(err){
    //handle error
  });

/*
grab the listings from more than one site. for cl grab the city prefixes from a list.
maybe grab multiple pages
make a data structure that has the content from each thumbnail stored in it.
if the post_id hasn't been blocked, then display it on the page and add a block button.
future
cache results so that it doesn't hit every site every time you click on a post and then return.
make a manual refresh button.
add thumbnails of the images within the post on the main page.
*/
