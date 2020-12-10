console.log('js');

let collection = [];

//creates parent 'CollectionItem' class
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
}

//writing this note as of Dec 9, currently the use of a seperate record child
//class is uneeded. the goal was to have not just records as media types, but
//movies, tv sets, etc. as well. that was my idea at the start of the project
//when I created the multi-class system

//creates child 'Record' class of parent 'CollectionItem'
class Record extends CollectionItem {
  constructor(title, artist, year, imgUrl, songList) {
    super(title);
    this._recordArtist = artist;
    this._recordYear = year;
    this._mediaImage = imgUrl;
    this._songList = songList;
  }

  get gArtist() {
    return this._recordArtist;
  }

  get gSongList() {
    return this._songList;
  }
}

const readyNow = () => {
  console.log('jq')
  createAlbumDisplay();//loads all albums stored in collection
  $('#_addRevealBtn').on('click', addRevealBtn);//listens for _addRevealBtn click
  $('#_addRecordBtn').on('click', addRecordBtn);//listens for _addRecordBtn click
  $('#_searchRevealBtn').on('click', searchRevealBtn);//listens for _searchRevealBtn click
  $('#_searchBtn').on('click', searchBtn);//listens for _searchBtn click
  $('#collectionDisplay').on('click', '.infoBtn', dropdownInfoBtn);//listens for which moreInfo button is pressed
  $('#_infoBackBtn').on('click', infoBackBtn);//listens for _infoBackBtn click
}

const createAlbumDisplay = () => {
  //Creates album displays for each item in collection array
  $(`#collectionDisplay`).empty();
  for (let i = 0; i < collection.length; i++) {
    $(`#collectionDisplay`).append(
      `<div class="dropdown">
         <button class="btn dropdown-toggle albumDisplay" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <img src="${collection[i].gImage}" class="albumImage">
           <div class="albumInfo">
             <p>${collection[i].gTitle}</p>
             <p>${collection[i].gArtist}</p>
             <p>${collection[i].gYear}</p>
           </div>
         </button>
         <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
           <button class="dropdown-item infoBtn" data-index-val= "${i}" type="button">More info</button>
           <button class="dropdown-item" id="" type="button">Add to cart</button>
         </div>
       </div)`)
  }
}//ends createAlbumDisplay function

const addRevealBtn = () => {
  createAlbumDisplay();//clears display
  //hides search row if shown and shows _searchRevealBtn
  $('#searchRecordRow').hide();
  $('#_searchRevealBtn').show();
  //shows the add fields and hides the reveal button
  $('#addRecordRow').show();
  $('#_addRevealBtn').hide();
}//end addRevealBtn function

const addRecord = (title, artist, year, imgUrl, songList) => {
  //adds album to collection array
  collection.push(new Record(title, artist, year, imgUrl, songList));
}//end addRecord function

const addRecordBtn = () => {
  //hides add row if shown and shows button
  $('#addRecordRow').hide();
  $('#_addRevealBtn').show();
  //if any of the input fields are empty, do nothing
  if ($('#titleInput').val() === '' ||
      $('#artistInput').val() === '' ||
      $('#yearInput').val() === '' ||
      $(`#imgInput`).val() === '') {
    return;
  }
  //resets display before adding new album and adds album on screen based on input
  else {
    createAlbumDisplay();
    addRecord($('#titleInput').val(), $('#artistInput').val(), $('#yearInput').val(), $(`#imgInput`).val());
    $(`#collectionDisplay`).append(
      `<div class="dropdown">
         <button class="btn dropdown-toggle albumDisplay" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <img src="${$(`#imgInput`).val()}" class="albumImage">
           <div class="albumInfo">
             <p>${$(`#titleInput`).val()}</p>
             <p>${$(`#artistInput`).val()}</p>
             <p>${$(`#yearInput`).val()}</p>
           </div>
         </button>
         <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
           <button class="dropdown-item infoBtn" data-index-val= "${collection.length - 1}" type="button">More info</button>
           <button class="dropdown-item" type="button">Add to cart</button>
         </div>
       </div>`);
     $('#addRecordRow').children('input').val('')
  }
}//end addRecordBtn function

const searchRevealBtn = () => {
  createAlbumDisplay();//resets display
  $('#addRecordRow').hide();
  $('#_addRevealBtn').show();
  //hides add row if shown and shows button
  $('#searchRecordRow').show();
  $('#_searchRevealBtn').hide();
  //shows the search fields and hides the reveal button
}//end searchRevealBtn function

const search = (title, artist, year) => {
  $(`#collectionDisplay`).empty();//clears display before every search
  $('#noResults').hide()//hides noResults
  let allRecordsWithCriteria = [];
  let searchArray = [];
  let searchItem = new Record(title, artist, year)
  //finds any album in the collection that matches any of the search criteria
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].gTitle === searchItem.gTitle ||
        collection[i].gArtist === searchItem.gArtist ||
        collection[i].gYear === searchItem.gYear) {
      searchArray.push(collection[i]);
    }
  }
  //displays entire collection and noResults if no search returns nothing
  if (searchArray.length === 0) {
    createAlbumDisplay();
    $('#noResults').show();
  }
  else {
    for (let i = 0; i < searchArray.length; i++) {
      //pushes exact title matches
      if (searchArray[i].gTitle === searchItem.gTitle) {
        allRecordsWithCriteria.push(searchArray[i]);
      }
      //pushes artist matches
      else if (searchItem.gTitle === null &&
               searchItem.gYear === null &&
               searchItem.gArtist === searchArray[i].gArtist) {
        allRecordsWithCriteria.push(searchArray[i]);
      }
      //pushes year matches
      else if (searchItem.gTitle === null &&
               searchItem.gArtist === null &&
               searchItem.gYear === searchArray[i].gYear) {
        allRecordsWithCriteria.push(searchArray[i]);
      }
      //pushes artsit & year matches
      else if (searchItem.gTitle === null &&
               searchItem.gYear === searchArray[i].gYear &&
               searchItem.gArtist === searchArray[i].gArtist) {
        allRecordsWithCriteria.push(searchArray[i]);
      }
    }
    //displays all albums on screen that returned from search
    for (let i = 0; i < allRecordsWithCriteria.length; i++) {
      $(`#collectionDisplay`).append(
        `<div class="dropdown">
           <button class="btn dropdown-toggle albumDisplay" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <img src="${allRecordsWithCriteria[i].gImage}" class="albumImage">
             <div class="albumInfo">
               <p>${allRecordsWithCriteria[i].gTitle}</p>
               <p>${allRecordsWithCriteria[i].gArtist}</p>
               <p>${allRecordsWithCriteria[i].gYear}</p>
             </div>
           </button>
           <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
             <button class="dropdown-item infoBtn" data-index-val= "${i}" type="button">More info</button>
             <button class="dropdown-item" type="button">Add to cart</button>
           </div>
         </div>`)
    }
  }
}//end search function

const searchBtn = () => {
  let searchTitle;
  let searchArtist;
  let searchYear;

  //if else checks for input, sets to null if none
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
  //search function rns with input grabbed from DOM or null
  search(searchTitle, searchArtist, searchYear)
  //resets values in input
  $('#searchRecordRow').children('input').val('')
}//end searchBtn function

let dropdownInfoBtn = num => {
  //hides storeFront dislay and shows infoDisplay
  //sets the more info display based on which more info was clicked
  $('#infoDisplay').show();
  $('#infoDisplay').css('display', 'flex')
  $('#storeFront').hide();
  $('#infoDisplay').prepend(`<img src="${collection[num.currentTarget.dataset.indexVal].gImage}" id="infoImg">`)
  for (let i = 0; i < collection[num.currentTarget.dataset.indexVal].gSongList.length; i++) {
    $('#songList').append(`<p class="song">${i + 1}. ${collection[num.currentTarget.dataset.indexVal].gSongList[i]}</p>`)
  }
}//end dropdownInfoBtn function

let infoBackBtn = () => {
  //hides infoDisplay and shows main display
  $('#storeFront').show();
  $('#infoDisplay').hide();
  //clears data that was appeneded to moreInfo
  $('#infoImg').remove();
  $('#songList').empty();
}

addRecord('Dreamland', 'Glass Animals', '2020', `https://media.pitchfork.com/photos/5f2daa5bbcc4654c5fe16cd4/1:1/w_600/dreamland_glass%20animals.jpg`,
['Dreamland', 'Tangerine', 'Hot Sugar', 'Space Ghost Coast to Coast', 'Tokyo Drifting', 'Melon and the Coconut', 'Your Love (Déjà Vu)',
"Waterfalls Coming Out Your Mouth", "It's All So Incredibly Loud", "Domestic Bliss", "Heat Waves", 	"Helium"])

addRecord('How to Be a Human Being', 'Glass Animals', '2016', `https://upload.wikimedia.org/wikipedia/en/2/2f/How_To_Be_A_Human_Being_cover_art.jpg`,
["Life Itself", "Youth", "Season 2 Episode 3", "Pork Soda", "Mama's Gun", "Cane Shuga", "[Premade Sandwiches]", "The Other Side of Paradise",
"Take a Slice", "Poplar St", "Agnes"])

addRecord('Stoney', 'Post Malone', '2016', 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg',
["Broken Whiskey Glass", "Big Lie", "Deja Vu", "No Option", "Cold", "White Iverson", "I Fall Apart", "Patient", "Go Flex", "Feel",
"Too Young", "Congratulations", "Up There", "Yours Truly, Austin Post"])

$(document).ready(readyNow);
