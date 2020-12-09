console.log('js');

let collection = [];

class CollectionItem {
  constructor(title, year, imgUrl) {
    this._itemTitle = title;
    this._recordYear = year;
    this._mediaImage = imgUrl;
  }

  get gTitle() {
    return this._itemTitle;
  }

  get gYear() {
    return this._recordYear;
  }

  get gImage() {
    return this._mediaImage;
  }
}//creates parent 'CollectionItem' class

class Record extends CollectionItem {
  constructor(title, artist, year, imgUrl) {
    super(title);
    this._recordArtist = artist;
    this._recordYear = year;
    this._mediaImage = imgUrl;
  }

  get gArtist() {
    return this._recordArtist;
  }
}//creates child 'Record' class of parent 'CollectionItem'

const readyNow = () => {
  console.log('jq')
  createAlbumDisplay();//loads all albums stored in collection
  $('#addRevealBtn').on('click', addRevealBtn);//listens for addRevealBtn click
  $('#addRecordBtn').on('click', addRecordBtn);//listens for addRecordBtn click
  $('#searchRevealBtn').on('click', searchRevealBtn);//listens for searchRevealBtn click
  $('#searchBtn').on('click', searchBtn);//listens for searchBtn click
}

const createAlbumDisplay = () => {
  $(`#collectionDisplay`).empty();
  for (let i = 0; i < collection.length; i++) {
    $(`#collectionDisplay`).append(
      `<div class="albumDisplay">
         <img src="${collection[i].gImage}" class="albumImage">
         <div class="albumInfo">
           <p>${collection[i].gTitle}</p>
           <p>${collection[i].gArtist}</p>
           <p>${collection[i].gYear}</p>
         </div>
       </div>`)
  }
  //Creates album displays for each item in collection array
}//ends createAlbumDisplay function

const addRevealBtn = () => {
  createAlbumDisplay();//clears display
  $('#searchRecordRow').hide();
  $('#searchRevealBtn').show();
  //hides search row if shown and shows button
  $('#addRecordRow').show();
  $('#addRevealBtn').hide();
  //shows the add fields and hides the reveal button
}//end addRevealBtn function

const addRecord = (title, artist, year, imgUrl) => {
  collection.push(new Record(title, artist, year, imgUrl));
}//end addRecord function

const addRecordBtn = () => {
  $('#addRecordRow').hide();
  $('#addRevealBtn').show();
  //hides add row if shown and shows button
  if ($('#titleInput').val() === '' ||
      $('#artistInput').val() === '' ||
      $('#yearInput').val() === '' ||
      $(`#imgInput`).val() === '') {
    return;
  }//if any of the input fields are empty, do nothing
  else {
    createAlbumDisplay();
    //resets display before adding new album
    addRecord($('#titleInput').val(), $('#artistInput').val(), $('#yearInput').val(), $(`#imgInput`).val());
    $(`#collectionDisplay`).append(
      `<div class="albumDisplay">
         <img src="${$(`#imgInput`).val()}" class="albumImage">
         <div class="albumInfo">
           <p>${$(`#titleInput`).val()}</p>
           <p>${$(`#artistInput`).val()}</p>
           <p>${$(`#yearInput`).val()}</p>
         </div>
       </div>`);
     $('#addRecordRow').children('input').val('')
  }
}//end addRecordBtn function

const searchRevealBtn = () => {
  createAlbumDisplay();//resets display
  $('#addRecordRow').hide();
  $('#addRevealBtn').show();
  //hides add row if shown and shows button
  $('#searchRecordRow').show();
  $('#searchRevealBtn').hide();
  //shows the search fields and hides the reveal button
}//end searchRevealBtn function

const search = (title, artist, year) => {
  $(`#collectionDisplay`).empty();//clears display before every search
  $('#noResults').hide()//hides noResults
  let allRecordsWithCriteria = [];
  let searchArray = [];
  let searchItem = new Record(title, artist, year)
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].gTitle === searchItem.gTitle ||
        collection[i].gArtist === searchItem.gArtist ||
        collection[i].gYear === searchItem.gYear) {
      searchArray.push(collection[i]);
    }
  }
  //finds any album in the collection that matches any of the search criteria
  if (searchArray.length === 0) {
    createAlbumDisplay();
    $('#noResults').show();
  }//displays entire collection and noResults if no search returns nothing
  else {
    for (let i = 0; i < searchArray.length; i++) {
      if (searchArray[i].gTitle === searchItem.gTitle) {
        allRecordsWithCriteria.push(searchArray[i]);
      }//pushes exact title matches
      else if (searchItem.gTitle === null &&
               searchItem.gYear === null &&
               searchItem.gArtist === searchArray[i].gArtist) {
        allRecordsWithCriteria.push(searchArray[i]);
      }//pushes artist matches
      else if (searchItem.gTitle === null &&
               searchItem.gArtist === null &&
               searchItem.gYear === searchArray[i].gYear) {
        allRecordsWithCriteria.push(searchArray[i]);
      }//pushes year matches
      else if (searchItem.gTitle === null &&
               searchItem.gYear === searchArray[i].gYear &&
               searchItem.gArtist === searchArray[i].gArtist) {
        allRecordsWithCriteria.push(searchArray[i]);
      }//pushes artsit & year matches
    }
    //if you want to search by one field, the other two have to be null
    //search(null, null, 2016)
    for (let i = 0; i < allRecordsWithCriteria.length; i++) {
      $(`#collectionDisplay`).append(
        `<div class="albumDisplay">
           <img src="${allRecordsWithCriteria[i].gImage}" class="albumImage">
           <div class="albumInfo">
             <p>${allRecordsWithCriteria[i].gTitle}</p>
             <p>${allRecordsWithCriteria[i].gArtist}</p>
             <p>${allRecordsWithCriteria[i].gYear}</p>
           </div>
         </div>`)
    }//displays all albums that returned from search
  }
}//end search function

const searchBtn = () => {
  let searchTitle;
  let searchArtist;
  let searchYear;

  if ($('#titleSearch').val() === "") {
    searchTitle = null;
  }
  else {
    searchTitle = $('#titleSearch').val();
  }

  if ($('#artistSearch').val() === "") {
    searchArtist = null;
  }
  else {
    searchArtist = $('#artistSearch').val();
  }

  if ($('#yearSearch').val() === "") {
    searchYear = null;
  }
  else {
    searchYear = $('#yearSearch').val();
  }
  search(searchTitle, searchArtist, searchYear)
  $('#searchRecordRow').children('input').val('')
  //if else checks for input, sets to null if none, then the search function runs and resets values in input
}//end searchBtn function

addRecord('Dreamland', 'Glass Animals', '2020', `https://upload.wikimedia.org/wikipedia/en/1/11/Dreamland_%28Glass_Animals%29.png`)
addRecord('How to Be a Human Being', 'Glass Animals', '2016', `https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/How_To_Be_A_Human_Being_cover_art.jpg/220px-How_To_Be_A_Human_Being_cover_art.jpg`)
addRecord('Stoney', 'Post Malone', '2016', 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg')

$(document).ready(readyNow);
