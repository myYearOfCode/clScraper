class Posting {
  constructor(dataIdString,title,price,location,link,description){
    this.dataIdString = dataIdString,
    // this.dataIds = process data id string here,
    this.title = title,
    this.price = price,
    this.location = location,
    this.link = link,
    this.description = description
  }

  printAttrs(){
    console.log( `///////////\n ${this.title} ${this.price} ${this.location} ${this.link} ${this.dataIdString }` )
  }

  // build(){
  //   //make the posting div from the data.
  //
  // }
}

module.exports = Posting;
