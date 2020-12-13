console.log('js');

let collection = [];
let allRecordsWithCriteria = [];
let shoppingCart = [];
let costTotal = 0;
let addSongCounter = 0;
let displayOnOrOff = [0, 0, 0];

//creates parent 'CollectionItem' class
class Record {
  constructor(title, artist, year, songList, imgUrl, price) {
    this._itemTitle = title;
    this._recordArtist = artist;
    this._recordYear = year;
    this._songList = songList;
    this._mediaImage = imgUrl;
    this._albumPrice = price;
  }

  get gTitle() {
    return this._itemTitle;
  }

  get gArtist() {
    return this._recordArtist;
  }

  get gYear() {
    return this._recordYear;
  }

  get gSongList() {
    return this._songList;
  }

  get gImage() {
    return this._mediaImage;
  }

  get gPrice() {
    return this._albumPrice;
  }
}

const readyNow = () => {
  //listens for all the button clicks
  console.log('jq')
  //buttons for homeDisplay
  $('#_viewAddBtn').on('click', viewAddBtn);
  $(`#_viewCollectionBtn`).on('click', viewCollectionBtn);
  $('._backBtn').on('click', backBtn);
  //buttons for addDisplay
  $('#_addSongBtn').on('click', addSongBtn);
  $('#_deleteSongBtn').on('click', deleteSongBtn)
  $('#_addRecordBtn').on('click', addRecordBtn);
  //buttons for searchDisplay
  $('#_viewSearchBtn').on('click', viewSearchBtn);
  $('#_searchSubmitBtn').on('click', searchSubmitBtn);
  $('#searchDisplay').on('click', '.infoBtn', dropdownInfoBtn);
  $('#searchDisplay').on('click', '.addCartBtn', dropdownCartBtn);
  //buttons for collectionDisplay and moreInfo
  $('#collectionDisplay').on('click', '.infoBtn', dropdownInfoBtn);
  $('#collectionDisplay').on('click', '.addCartBtn', dropdownCartBtn);
  $('#_infoBackBtn').on('click', infoBackBtn);
  //buttons for cartDisplay
  $('#_viewCartBtn').on('click', viewCartBtn);
  $('#cartDisplay').on('click', '.delCartBtn', dropdownDelCartBtn);
  $('#_cartCheckoutBtn').on('click', cartCheckoutBtn);
}//end readyNow

const createAlbumDisplay = () => {
  //checks for which display was up last, search or collection
  //Creates album displays for each item in either search or collectionDisplay
  for (let x = 0; x < displayOnOrOff.length; x++) {
    if (displayOnOrOff[x] > 0) {
      for (let i = 0; i < collection.length; i++) {
        $(`#albumList${x}`).append(
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
               <button class="dropdown-item addCartBtn" data-index-val= "${i}" type="button">Add to cart</button>
             </div>
            </div)`);
      }
    }
  }
}//ends createAlbumDisplay function

const viewAddBtn = () => {
  //hide homeDisplay and show addDisplay
  $('#homeDisplay').hide();
  $('#addDisplay').show();
}//end addRevealBtn function

const viewSearchBtn = () => {
  //hide homeDisplay and show searchDisplay
  //toggles notifier that searchDisplay was clicked
  displayOnOrOff[0]++;
  $(`#homeDisplay`).hide();
  $(`#searchDisplay`).show();
}//end searchRevealBtn function

const viewCollectionBtn = () => {
  //hide homeDisplay and show collectionDisplay
  //toggles notifier that collectionDisplay was clicked
  //creates album displays
  displayOnOrOff[1]++;
  $(`#homeDisplay`).hide();
  $(`#collectionDisplay`).show();
  createAlbumDisplay();
}//end viewCollectionBtn function

const viewCartBtn = () => {
  //ticks on the cartDisplay indicatior
  //hides home and shows cart display
  //creates albumDisplays for every album added to cart
  //displays costTotal
  displayOnOrOff[2]++;
  $(`#homeDisplay`).hide();
  $('#cartDisplay').show();
  costTotal = costTotal.toFixed(2);
  $('#_costTotal').append(`$${costTotal}`);
  for (let i = 0; i < collection.length; i++) {
    $(`#albumList2`).append(
      `<div class="dropdown">
          <button class="btn dropdown-toggle albumDisplay" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <img src="${shoppingCart[i].gImage}" class="albumImage">
           <div class="albumInfo">
             <p>${shoppingCart[i].gTitle}</p>
             <p>${shoppingCart[i].gArtist}</p>
             <p>${shoppingCart[i].gYear}</p>
           </div>
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
           <button class="dropdown-item infoBtn" data-index-val= "${i}" type="button">More info</button>
           <button class="dropdown-item delCartBtn" data-index-val= "${i}" type="button">Remove from cart</button>
         </div>
        </div)`);
  }
}

const backBtn = () => {
  //checks which display was turned on and adjusts it's array position
  //hides and clears any display that is not homeDisplay, shows homeDisplay
  for (let i = 0; i < displayOnOrOff.length; i++) {
    if (displayOnOrOff[i] > 0) {
      displayOnOrOff[i]--;
    }
  }
  $('.albumList').empty();
  $('#addDisplay').hide();
  $(`#searchDisplay`).hide();
  $('#collectionDisplay').hide();
  $('#cartDisplay').hide();
  $('#albumList2').empty();
  $('#_costTotal').empty();
  $('#homeDisplay').show();
}//end backBtn funciton

const addSongBtn = () => {
  //will add a song text field to the display on click
  //increments addSongCounter
  $('#addSongList').append(`<div class="addSongItem"><p>${addSongCounter + 1}. </p><input placeholder="Song Name" id="addSong${addSongCounter}"></div>`);
  addSongCounter++;
}//end addSongBtn

const deleteSongBtn = () => {
  //removes the last added song
  //decrements addSongCounter
  $('#addSongList').children().last().remove();
  addSongCounter--;
}//end deleteSongBtn

const addToCollection = (title, artist, year, songList, imgUrl, price) => {
  //adds album to collection array
  //returns added object
  collection.push(new Record(title, artist, year, songList, imgUrl, price));
  return collection[collection.length - 1];
}//end addToCollection function

const addRecordBtn = () => {
  //if any of the input fields are empty, do nothing
  //else, create array of songs and creates a record object based on input
  let songListArray = [];

  if ($('#titleAdd').val() === '' ||
      $('#artistAdd').val() === '' ||
      $('#yearAdd').val() === '') {
    return;
  }
  else {
    for (let i = 0; i < addSongCounter; i++) {
      songListArray[i] = $(`#addSong${i}`).val();
    }
    addToCollection($('#titleAdd').val(), $('#artistAdd').val(), $('#yearAdd').val(), songListArray, $(`#imgAdd`).val(), $('#priceAdd').val());
     $('#addForm').children('input').val('');
     $('#addSongList').empty();
     $('#addDisplay').hide();
     $('#homeDisplay').show();
  }
}//end addRecordBtn function

const search = (title, artist, year, song) => {
  //clears search albumList and allRecordsWithCriteria before every search
  //hides noResults
  //finds any album in the collection that matches any of the search criteria
  //displays entire collection and noResults if search returns nothing
  //if a song match is found, display infoDisplay with matching album
  //else push exact title, artist, year, or year & artist matches to searchArray
  //displays all albums on screen from searchArray that returned from search
  $(`#albumList0`).empty();
  $('#noResults').hide();
  allRecordsWithCriteria = [];

  let searchArray = [];
  let searchItem = new Record(title, artist, year, song);

  for (let i = 0; i < collection.length; i++) {
    if (collection[i].gTitle === searchItem.gTitle ||
        collection[i].gArtist === searchItem.gArtist ||
        collection[i].gYear === searchItem.gYear) {
      searchArray.push(collection[i]);
    }
  }
  if (searchArray.length === 0) {
    createAlbumDisplay();
    $('#noResults').show();
  }
  else {
    for (let i = 0; i < searchArray.length; i++) {
      if (searchArray[i].gTitle === searchItem.gTitle) {
        allRecordsWithCriteria.push(searchArray[i]);
      }
      else if (searchItem.gTitle === null &&
               searchItem.gYear === null &&
               searchItem.gArtist === searchArray[i].gArtist) {
        allRecordsWithCriteria.push(searchArray[i]);
      }
      else if (searchItem.gTitle === null &&
               searchItem.gArtist === null &&
               searchItem.gYear === searchArray[i].gYear) {
        allRecordsWithCriteria.push(searchArray[i]);
      }
      else if (searchItem.gTitle === null &&
               searchItem.gYear === searchArray[i].gYear &&
               searchItem.gArtist === searchArray[i].gArtist) {
        allRecordsWithCriteria.push(searchArray[i]);
      }
    }
    for (let i = 0; i < allRecordsWithCriteria.length; i++) {
      $(`#albumList0`).append(
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
             <button class="dropdown-item addCartBtn" data-index-val= "${i}" type="button">Add to cart</button>
           </div>
         </div>`);
    }
  }
  for (let i = 0; i < collection.length; i++) {
    for (let x = 0; x < collection[i].gSongList.length; x++) {
      if (searchItem.gSongList === collection[i].gSongList[x]) {
        $('#infoDisplay').show();
        $('#infoDisplay').css('display', 'flex');
        $('#searchDisplay').hide();
        $('#noResults').hide();
        $('#albumList0').empty();
        $('#infoDisplay').prepend(`<img src="${collection[i].gImage}" id="infoImg">`);
        for (let y = 0; y < collection[i].gSongList.length; y++) {
          $('#songList').append(`<p class="song">${y + 1}. ${collection[i].gSongList[y]}</p>`);
        }
      }
    }
  }
}//end search function

const searchSubmitBtn = () => {
  //if else checks for input, sets to null if none
  //search function rns with input grabbed from DOM or null
  //resets values in input
  let searchTitle;
  let searchArtist;
  let searchYear;
  let searchSong;

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
  if ($('#songSearch').val() === "") {
    searchSong = null;
  }
  else {
    searchSong = $('#songSearch').val();
  }
  search(searchTitle, searchArtist, searchYear, searchSong);
  $('#searchForm').children('input').val('');
}//end searchBtn function

const cartCheckoutBtn = () => {
  //clear albumList and replace with Thank you!
  //clear _costTotal
  $('#albumList2').empty();
  $('#albumList2').append('<h1 id="cartTY">Thank you!</h1>');
  $('#_costTotal').empty();
  costTotal = 0;
  shoppingCart = [];
}

let dropdownInfoBtn = num => {
  //checks which display was up last, search or collection
  //hides display and shows infoDisplay
  //sets the more info display based on which more info was clicked
  if (displayOnOrOff[0] > 0) {
    $('#infoDisplay').show();
    $('#infoDisplay').css('display', 'flex');
    $('#searchDisplay').hide();
    $('#infoDisplay').prepend(`<img src="${allRecordsWithCriteria[num.currentTarget.dataset.indexVal].gImage}" id="infoImg">`);
    for (let i = 0; i < allRecordsWithCriteria[num.currentTarget.dataset.indexVal].gSongList.length; i++) {
      $('#songList').append(`<p class="song">${i + 1}. ${allRecordsWithCriteria[num.currentTarget.dataset.indexVal].gSongList[i]}</p>`);
    }
  }
  else if (displayOnOrOff[1] > 0) {
    $('#infoDisplay').show();
    $('#infoDisplay').css('display', 'flex');
    $('#collectionDisplay').hide();
    $('#infoDisplay').prepend(`<img src="${collection[num.currentTarget.dataset.indexVal].gImage}" id="infoImg">`);
    for (let i = 0; i < collection[num.currentTarget.dataset.indexVal].gSongList.length; i++) {
      $('#songList').append(`<p class="song">${i + 1}. ${collection[num.currentTarget.dataset.indexVal].gSongList[i]}</p>`);
    }
  }
}//end dropdownInfoBtn function

let infoBackBtn = () => {
  //checks which display was previously viewed
  //hides infoDisplay and shows previous display
  //clears data that was appeneded to moreInfo
  for (let x = 0; x < displayOnOrOff.length; x++) {
    if (displayOnOrOff[0] > 0) {
      $('#searchDisplay').show();
      $('#infoDisplay').hide();
      $('#infoImg').remove();
      $('#songList').empty();
    }
    else if (displayOnOrOff[1] > 0) {
      $('#collectionDisplay').show();
      $('#infoDisplay').hide();
      $('#infoImg').remove();
      $('#songList').empty();
    }
  }
}

let dropdownCartBtn = num => {
  //checks which display is visible to know which array to grab data from
  //pushes selected object to shoppingCart
  //adds album price to costTotal
  if (displayOnOrOff[0] > 0) {
    shoppingCart.push(allRecordsWithCriteria[num.currentTarget.dataset.indexVal]);
    costTotal += allRecordsWithCriteria[num.currentTarget.dataset.indexVal].gPrice;
  }
  else if (displayOnOrOff[1] > 0) {
    shoppingCart.push(collection[num.currentTarget.dataset.indexVal]);
    costTotal += collection[num.currentTarget.dataset.indexVal].gPrice;
  }
}

let dropdownDelCartBtn = num => {
  //removes selected item from shoppingCart
  //clears and remakes display
  costTotal-= shoppingCart[num.currentTarget.dataset.indexVal].gPrice;
  shoppingCart.splice(num.currentTarget.dataset.indexVal, 1);
  $('#albumList2').empty();
  $('#_costTotal').empty();
  costTotal = costTotal.toFixed(2);
  $('#_costTotal').append(`$${costTotal}`);
  for (let i = 0; i < collection.length; i++) {
    $(`#albumList2`).append(
      `<div class="dropdown">
          <button class="btn dropdown-toggle albumDisplay" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <img src="${shoppingCart[i].gImage}" class="albumImage">
           <div class="albumInfo">
             <p>${shoppingCart[i].gTitle}</p>
             <p>${shoppingCart[i].gArtist}</p>
             <p>${shoppingCart[i].gYear}</p>
           </div>
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
           <button class="dropdown-item infoBtn" data-index-val= "${i}" type="button">More info</button>
           <button class="dropdown-item delCartBtn" data-index-val= "${i}" type="button">Remove from cart</button>
         </div>
        </div)`);
  }
}

addToCollection('Dreamland', 'Glass Animals', '2020', ['Dreamland', 'Tangerine', 'Hot Sugar', 'Space Ghost Coast to Coast', 'Tokyo Drifting', 'Melon and the Coconut', 'Your Love (Déjà Vu)',
"Waterfalls Coming Out Your Mouth", "It's All So Incredibly Loud", "Domestic Bliss", "Heat Waves", 	"Helium"], `https://media.pitchfork.com/photos/5f2daa5bbcc4654c5fe16cd4/1:1/w_600/dreamland_glass%20animals.jpg`,
 10.99);

addToCollection('How to Be a Human Being', 'Glass Animals', '2016', ["Life Itself", "Youth", "Season 2 Episode 3", "Pork Soda", "Mama's Gun", "Cane Shuga", "[Premade Sandwiches]", "The Other Side of Paradise",
"Take a Slice", "Poplar St", "Agnes"], `https://upload.wikimedia.org/wikipedia/en/2/2f/How_To_Be_A_Human_Being_cover_art.jpg`, 7.99);

addToCollection('Stoney', 'Post Malone', '2016', ["Broken Whiskey Glass", "Big Lie", "Deja Vu", "No Option", "Cold", "White Iverson", "I Fall Apart", "Patient", "Go Flex", "Feel",
"Too Young", "Congratulations", "Up There", "Yours Truly, Austin Post"], 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg', 9.99);

addToCollection('The Dark Side of the Moon', 'Pink Floyd', '1973', ["Speak to Me", 	"Breathe", 	"On the Run", "Time", "The Great Gig in the Sky", "Money", "Us and Them", "Any Colour You Like",
"Brain Damage", "Eclipse"], 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png', 12.99);

addToCollection('Badlands', 'Halsey', '2015', ["Castle", "Hold Me Down", "New Americana", "Drive", "Roman Holiday", "Colors", "Coming Down", 	"Haunting", "Control", "Young God", "Ghost"],
'https://upload.wikimedia.org/wikipedia/en/4/4c/Halsey_-_Badlands.png', 9.99);

addToCollection('Appetite for Destruction', "Guns N' Roses", '1987', ["Welcome to the Jungle", "It's So Easy", "Nightrain", "Out ta Get Me", "Mr. Brownstone", "Paradise City", "My Michelle",
"Think About You", "Sweet Child o' Mine", "You're Crazy",	"Anything Goes", "Rocket Queen"], 'https://upload.wikimedia.org/wikipedia/en/6/60/GunsnRosesAppetiteforDestructionalbumcover.jpg', 9.99);

addToCollection('DR. FEELGOOD', 'Mötley Crüe', '1989', ["T.n.T. (Terror 'n Tinseltown)", "Dr. Feelgood", "Slice of Your Pie", "Rattlesnake Shake", "Kickstart My Heart", 	"Without You",
"Same Ol' Situation (S.O.S.)", "Sticky Sweet", "She Goes Down", "Don't Go Away Mad (Just Go Away)", "Time for Change"], 'https://upload.wikimedia.org/wikipedia/en/3/38/Motley_Crue_-_Dr_Feelgood-front.jpg', 9.99);

addToCollection('Harry Styles', 'Harry Styles', '2017', ["Meet Me in the Hallway", "Sign of the Times", "Carolina", "Two Ghosts", "Sweet Creature", "Only Angel", "Kiwi", "Ever Since New York",
"Woman", "From the Dining Table"], 'https://upload.wikimedia.org/wikipedia/en/a/a0/HarryStyles-albumcover.png', 9.99);

addToCollection('Elvis Presley', 'Elvis Presley', '1956', ["Blue Suede Shoes", "I'm Counting on You", "I Got a Woman", "One Sided Love Affair", "I Love You Because", "Just Because",	"Tutti Frutti",
"Tryin' to Get to You", "I'm Gonna Sit Right Down and Cry (Over You)", "I'll Never Let You Go (Little Darlin')", "Blue Moon", "Money Honey"], 'https://upload.wikimedia.org/wikipedia/en/f/f5/Elvis_Presley_LPM-1254_Album_Cover.jpg', 9.99);

addToCollection('Hanson', 'Middle of Nowhere', '1997', ["Thinking of You", "Thinking of You", "Weird", "Speechless", "Where's the Love", "Yearbook", "Look at You", "Lucy", "I Will Come to You",
"A Minute Without You", "Madeline", "With You in Your Dreams", "Man from Milwaukee"], 'https://upload.wikimedia.org/wikipedia/en/8/83/HansonMON.jpg', 13.77);

addToCollection('Legend', 'Bob Marley and the Wailers', '1984', ["Is This Love", "No Woman, No Cry", "Could You Be Loved", "Three Little Birds", "Buffalo Soldier",
"Get Up, Stand Up", "Stir It Up", "One Love/People Get Ready", "I Shot the Sheriff", "Waiting in Vain", "Redemption Song", "Satisfy My Soul", "Exodus", "Jamming"],
'https://upload.wikimedia.org/wikipedia/en/c/c2/BobMarley-Legend.jpg', 9.99);

addToCollection('Hotel California', 'Eagles', '1976', ["Hotel California", "New Kid in Town", "Life in the Fast Lane", "Wasted Time", "Victim of Love", "Pretty Maids All in a Row",
"Try and Love Again", "The Last Resort"], 'https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg', 9.99);

addToCollection('Willy and the Poor Boys', 'Creedance Clearwater Revival', '1969', ["Down on the Corner", "It Came Out of the Sky", "Cotton Fields", "Poorboy Shuffle", "Feelin' Blue",
"Fortunate Son", "Don't Look Now (It Ain't You or Me)", "The Midnight Special", "Side o' the Road", "Effigy"], 'https://upload.wikimedia.org/wikipedia/en/8/85/Willy_and_the_poor_boys.jpg', 9.99);

addToCollection('Strange Days', 'The Doors', '1967', ["Strange Days", "You're Lost Little Girl", "Love Me Two Times", "Unhappy Girl", "Horse Latitudes", "Moonlight Drive", "People Are Strange",
"My Eyes Have Seen You", "I Can't See Your Face in My Mind", "When the Music's Over"], 'https://upload.wikimedia.org/wikipedia/en/f/fc/AlbumStrangeDays.jpg', 9.99);

addToCollection('Lonerism', 'Tame Impala', '2012', ["Be Above It", "Endors Toi", "Apocalypse Dreams", "Mind Mischief", "Music to Walk Home By", "Why Won't They Talk to Me?",
"Feels Like We Only Go Backwards", "Keep on Lying", "Elephant", "She Just Won't Believe Me", "Nothing That Has Happened So Far Has Been Anything We Could Control", "Sun's Coming Up"],
'https://upload.wikimedia.org/wikipedia/en/3/31/Tame_Impala_-_Lonerism.png', 8.99);

addToCollection('After Hours', 'The Weekend', '2020', ["Alone Again", "Too Late", "Hardest to Love", "Scared to Live", "Snowchild", "Escape from LA", "Heartless", "Faith", "Blinding Lights",
"In Your Eyes", "Save Your Tears", 	"Repeat After Me", "After Hours", 	"Until I Bleed Out"], 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png', 11.99);

addToCollection('Heaven or Hell', 'Don Toliver', '2020', ["Heaven or Hell", "Euphoria", "Cardigan", "After Party", "Wasted", "Can't Feel My Legs", "Candy", "Company", "Had Enough",
"Spaceship", "No Photos", "No Idea"], 'https://upload.wikimedia.org/wikipedia/en/a/a0/Don_Toliver_-_Heaven_or_Hell.png', 7.99);

addToCollection('everything means nothing', 'blackbear', '20202', ["hot girl bummer", "me & ur ghost", "queen of broken hearts", "i feel bad", "i feel 2 much", "i felt that",
"sobbing in cabo", "clown", "half alive", "if i were u", "why are girls?", "smile again"], 'https://upload.wikimedia.org/wikipedia/en/d/de/Blackbear_-_Everything_Means_Nothing.png', 9.99)

addToCollection('deadroses', 'blackbear', '2015', ["4u", "ain't trippin", "90210", "ain't love", "idfc", "waste away", "dirty laundry", "my heart is lost", "deadroses"],
'https://images.genius.com/e619e73fce7e4137d0f77a4906e8dba6.1000x1000x1.jpg', 9.99);

addToCollection('digital druglord', 'blackbear', '2017', ["Hell Is Where I Dreamt of U and Woke Up Alone", "Moodz", "I Miss the Old U", "Do Re Mi", "Wish U the Best", "Juicy Sweatsuits", "Double",
"If I Could I Would Feel Nothing", "Chateau", "Make Daddy Proud"], 'https://upload.wikimedia.org/wikipedia/en/e/ec/Digital_Druglord_-_Blackbear.jpg', 7.99);

addToCollection('THE MARSHALL MATHERS LP', 'Eminem', '2000', ["Public Service Announcement 2000", "Kill You", "Stan", "Paul", "Who Knew", 	"Steve Berman", "The Way I Am", "The Real Slim Shady",
	"Remember Me?", "I'm Back", "Marshall Mathers", "Ken Kaniff", "Drug Ballad", "Amityville", "Bitch Please II",	"Kim", "Under the Influence", "Criminal"],
'https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg', 9.99);

addToCollection('Death of a Bachelor', 'Panic! at the Disco', '2016', ["Victorious", "Don't Threaten Me with a Good Time", "Hallelujah", "Emperor's New Clothes", "Death of a Bachelor", "Crazy=Genius", "LA Devotee",
"Golden Days", "The Good, the Bad and the Dirty", "House of Memories", "Impossible Year"], 'https://upload.wikimedia.org/wikipedia/en/e/e4/Death_of_a_Bachelor.jpg', 9.99);

addToCollection('Tasty', 'Kelis', '2003', ["Intro", "Trick Me", "Milkshake", "Keep It Down", "In Public", "Flashback", "Protect My Heart", "Millionaire", "Glow", "Sugar Honey Iced Tea", "Attention",
	"Rolling Through the Hood", "Stick Up", "Stick Up"], 'https://upload.wikimedia.org/wikipedia/en/1/10/Kelis_-_Tasty.png', 9.99);

addToCollection('The Stranger', 'Billy Joel', '1977', ["Movin' Out (Anthony's Song)", "The Stranger", "Just the Way You Are", "Scenes from an Italian Restaurant", "Vienna", "Only the Good Die Young",
	"She's Always a Woman", "Get It Right the First Time", "Everybody Has a Dream"], 'https://upload.wikimedia.org/wikipedia/en/f/f5/Thestranger1977.jpg', 8.99);

addToCollection('Fine Line', "Harry Styles", '2019', ["Golden", "Watermelon Sugar", "Adore You", "Lights Up", "Cherry", "Falling", "To Be So Lonely", "She", "Sunflower, Vol. 6", "Canyon Moon",
"Treat People with Kindness", "Fine Line"], 'https://upload.wikimedia.org/wikipedia/en/b/b1/Harry_Styles_-_Fine_Line.png', 10.99);

addToCollection('AM', 'Arctic Monkeys', '2013', ["Do I Wanna Know?", "R U Mine?", 	"One for the Road", "Arabella", "I Want It All", "No.1 Party Anthem", "Mad Sounds", "Fireside", "Why'd You Only Call Me When You're High?",
"Snap Out of It", "Knee Socks", "I Wanna Be Yours"], 'https://upload.wikimedia.org/wikipedia/en/0/04/Arctic_Monkeys_-_AM.png', 9.99);

addToCollection('Jazz', 'Queen', '1978', ["Mustapha", "Fat Bottomed Girls", "Jealousy", "Bicycle Race", "If You Can't Beat Them", "Let Me Entertain You", "Dead on Time", "In Only Seven Days", "Dreamer's Ball", "Fun It",
"Leaving Home Ain't Easy", "Don't Stop Me Now", "More of That Jazz"], 'https://upload.wikimedia.org/wikipedia/en/0/06/Queen_Jazz.png', 11.99);

addToCollection('Back on Top', 'The Front Bottoms', '2015', ["Motorcycle", "Summer Shandy", "Cough It Out", "HELP", "Laugh Till I Cry", "Historic Cemetery", "The Plan", "Ginger", "2YL", "West Virginia", "Plastic Flowers"],
'https://upload.wikimedia.org/wikipedia/en/8/8f/Backontop.jpg', 9.99);

addToCollection('Enema of the State', 'Blink-182', '1999', ["Dumpweed", "Don't Leave Me", "Aliens Exist", "Going Away to College", "What's My Age Again?", "Dysentery Gary", "Adam's Song", "All the Small Things", "The Party Song",
	"Mutt", "Wendy Clear", "Anthem"], 'https://upload.wikimedia.org/wikipedia/en/a/a6/Blink-182_-_Enema_of_the_State_cover.jpg', 6.99);

addToCollection('HELLBOY', 'Lil Peep', '2016', ["Hellboy", "Drive By", "OMFG", "The Song They Played [When I Crashed Into the Wall]", "F--ked Up", 	"Cobain", "Gucci Mane", "Interlude", "Worlds Away", "Red Drop Shawty",
"Girls", "Nose Ring", "We Think Too Much", "The Last Thing I Wanna Do", "Walk Away as the Door Slams", 	"Move On, Be Strong"], 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/LilPeep-Hellboy_%28cropped%29.jpg/440px-LilPeep-Hellboy_%28cropped%29.jpg', 9.99);

addToCollection('A Place Where the Sun is Silent', 'Alesana', '2011', ["The Dark Wood of Error", "A Forbidden Dance", "Hand in Hand with the Damned", "Beyond the Sacred Glass", "The Temptress", "Circle VII: Sins of the Lion", "Vestige",
"Lullaby of the Crucified", "Before Him All Shall Scatter", "Labyrinth", "The Fiend", "Welcome to the Vanity Faire", "The Wanderer", "A Gilded Masquerade", "The Best Laid Plans of Mice and Marionettes", 	"And Now for the Final Illusion"],
'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/A_Place_Where_the_Sun_Is_Silent_%28Alesana_album_-_cover_art%29.jpg/220px-A_Place_Where_the_Sun_Is_Silent_%28Alesana_album_-_cover_art%29.jpg', 11.99);

addToCollection("Razia's Shadow: A Musical", 'Forgive Durden', '2008', ["Genesis", 	"The Missing Piece", "Life is Looking Up", "The Spider and the Lamps", "Toba the Tura", "The Oracle", "A Hundred Year, Minute-Long Intermission",
"The Exit", "It's True Love", "Meet the King", "Holy the Sea", 	"Doctor Doctor", "The End and the Beginning"], 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Fordurraz.jpg/220px-Fordurraz.jpg', 9.99);

addToCollection('Hawaii: Part II', 'ミラクルミュージカル', '2012', ["Introduction to the Snow", "Isle Unto Thyself", "Black Rainbows", "White Ball", "Murders", "宇宙ステーションのレベル7", "The Mind Electric", "Labyrinth",
"Time Machine", "Stranded Lullaby", "Dream Sweet In Sea Major"], 'https://vignette.wikia.nocookie.net/tallyhall/images/a/a4/Hawaiiptii.jpg/revision/latest/scale-to-width-down/200?cb=20150728023256', 9.99);

addToCollection('Self Entitled', 'NOFX', '2012', ["72 Hookers", 	"I Believe in Goddess", "Ronnie & Mags", "She Didn't Lose Her Baby", "Secret Society", "I, Fatty", "Cell Out", "Down with the Ship", 	"My Sycophant Others", "This Machine Is 4",
"I've Got One Jealous Again, Again", "Xmas Has Been X'ed"], 'https://upload.wikimedia.org/wikipedia/en/d/d7/NOFX_-_Self_Entitled_cover.jpg', 9.99);

addToCollection('Marcy Playground', 'Marcy Playground', '1997', ["Poppies", "Sex and Candy", "Ancient Walls of Flowers", "Saint Joe on the School Bus", "A Cloak of Elvenkind", "Sherry Fraser", "Gone Crazy", 	"Opium", "One More Suicide",
"Dog and His Master", "The Shadow of Seattle", "The Vampires of New York"], 'https://upload.wikimedia.org/wikipedia/en/c/c0/Marcy_Playground_-_Marcy_Playground_album_cover.gif', 9.99);

addToCollection('Divers & Submarines', 'Passenger', '2010', ["Community Centre", "Fairytales & Firesides", "Divers & Submarines", "Facebook", "House On A Hill", "Two Tales", "Intacto",
"Brick Walls", "Crows In Snow"], 'https://images.genius.com/bb0faf378f996ee03627127c2022fe5e.640x640x1.jpg', 8.91);

addToCollection('Eve 6', 'Eve 6', '1998', ["How Much Longer", "Inside Out", "Leech", "Showerhead", "Open Road Song", "Jesus Nitelite", "Superhero Girl", "Tongue Tied", "Saturday Night",
"There's a Face", "Small Town Trap"], 'https://upload.wikimedia.org/wikipedia/en/1/1b/Eve6Album.jpg', 9.99);

addToCollection('To Pimp a Butterfly', 'Kendrick Lamar', '2015', ["Wesley's Theory", "For Free? (Interlude)", "King Kunta", "Institutionalized", 	"These Walls", "U", "Alright", 	"For Sale? (Interlude)",
"Momma", "Hood Politics", "How Much a Dollar Cost", "Complexion (A Zulu Love)", "The Blacker the Berry", 	"You Ain't Gotta Lie (Momma Said)", "I", 	"Mortal Man"], 'https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png', 9.99);

addToCollection('#Maxo 187', 'Maxo Kreme', '2015', ["Thirteen", 	"Paranoia", "Clientele", "1998 Interlude", "1998", "Astrodome", "Trap Mami / Flippin", "Sold Out", "FTL Interlude", "Murder",
"KKK", 	"Cell Boomin", "Endzone", "Trigga Maxo", "Issues"], 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Maxo187.jpg/440px-Maxo187.jpg', 9.99);

addToCollection('1999', 'Joey Badass', '2012', ["Summer Knights", 	"Waves", "FromdaTombs", "Survival Tactics", "Killuminati", "Hardknock", "World Domination", "Pennyroyal", "Funky Ho's", "Daily Routine",
	"Snakes", "Don't Front", "Righteous Minds", "Where It's At", "Suspect"], 'https://upload.wikimedia.org/wikipedia/en/5/56/1999_Joey_Badass.jpg', 9.99);

addToCollection('Illmatic', 'Nas', '1994', ["The Genesis", "N.Y. State of Mind", "Life's a Bitch", "The World Is Yours", "Halftime", "Memory Lane (Sittin' in da Park)", "One Love", 	"One Time 4 Your Mind", "Represent",
"It Ain't Hard to Tell"], 'https://upload.wikimedia.org/wikipedia/en/2/27/IllmaticNas.jpg', 9.99)

$(document).ready(readyNow);
