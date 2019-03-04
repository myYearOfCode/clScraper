class Posting {
  constructor(dataIdString,title,price,location,link, blocked, dataPid){
    this.dataIdString = dataIdString,
    // this.dataIds = process data id string here,
    this.title = title,
    this.price = price,
    this.location = location,
    this.link = link,
    // this.description = description,
    this.blocked = blocked,
    this.dataPid = dataPid
  }

  getImage(dataId) {
    /*sizes:
    50x50
    300x300
    600x450
    */
    let images = (this.parseDataId(dataId))
    // TODO this is hard-coded to return one image
    // return images.map((image) => {
    return `<img class = "photo300" src = "https://images.craigslist.org/${images[0]}_300x300.jpg">`
    // })
  }

  parseDataId(dataId) {
    let imageArray = dataId.split(",")
    imageArray = imageArray.map((imageId) => {
      return (imageId.split(":")[1])
    })
    return imageArray
  }

  display (){
      if (!(this.blocked).find((each) => {
        return (each === this.dataPid)}
      )) {
      console.log(`${this.blocked} ${this.dataPid}`)
        return (`
        <div class = "outside">
          <div class = "photoDiv">
            ${this.getImage(this.dataIdString)}
          </div>
          <div class="text">
            <a href = "${this.link}">
              <div class = "${this.title}" > ${this.title} </div>
            </a>
            <div class = "${this.price}" > ${this.price} </div>
            <div class = "${this.location}" > Location: ${this.location} </div>
            <div class = "${this.description}" > ${this.description || ""} </div>
            <div class = "hideElement" > Hide </div>
          </div>
        </div>`)
      }

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
