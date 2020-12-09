console.log('js');

let parkedCars = [];
const maxCars = 6;
let currentCarsParked = 0;
let parkingSpotNum;
let objectValues;

let vehicle = {
  _parkingSpot: null,
  _vehicleMake: '',
  _vehicleModel: '',
  _vehicleYear: '' ,
  _vehicleColor: '',

  set sMake(vehicleMake) {
    this._vehicleMake = vehicleMake;
  },

  set sModel(vehicleModel) {
    this._vehicleModel = vehicleModel;
  },

  set sYear(vehicleYear) {
    this._vehicleYear = vehicleYear;
  },

  set sColor(vehicleColor) {
    this._vehicleColor = vehicleColor;
  },

  set sSpot(parkingSpot) {
    this._parkingSpot = parkingSpot;
  },

  get gMake() {
    if (typeof this._vehicleMake === 'string') {
      return `${this._vehicleMake}`;
    }
  },

  get gModel() {
    if (typeof this._vehicleColor === 'string') {
      return `${this._vehicleModel}`;
    }
  },

  get gYear() {
    if (typeof this._vehicleYear === 'string') {
      return `${this._vehicleYear}`;
    }
  },

  get gColor() {
    if (typeof this._vehicleColor === 'string') {
      return `${this._vehicleColor}`;
    }
  },

  get gParkingSpot() {
    if (typeof this._parkingSpot === 'number') {
      return Number(this._parkingSpot);
    }//if value is a number, keep as number
    else {
      return this._parkingSpot;
    }//if value is anything else, return as is
  }//if else might be redundant?? at least my numbers stay numbers for sure

  //is most likely redundant
}

const readyNow = () => {
  console.log('JQ')
  $('#parkingSpaces').on('click', '.parkingEvent', spotSelector)//listens for buttonSpot click
  $('#submitButton').on('click', parkCar);//listens for submitButton click
  $('#deleteButton').on('click', takeForASpin);//listens for deleteButton click
  $('#wsMsgTwo').hide();
  $('#wsMsgThree').hide();
}

const spotSelector = spotNum => {
  parkingSpotNum = spotNum.currentTarget.dataset.spotNumber;
  parkingSpotNum = Number(parkingSpotNum);
  if (currentCarsParked === 0) {
    $('#inputCol').css('visibility', 'visible');
    $('#wsMsgOne').hide();
    $('#wsMsgTwo').show();
  }
  else if (currentCarsParked > 0) {
    if (parkedCars[parkingSpotNum - 1] !== undefined) {
      objectValues = Object.values(parkedCars[parkingSpotNum - 1]);
      $('#inputCol').css('visibility', 'hidden');
      $('#outputCol').css('visibility', 'visible');
      $('#outputMakeElement').replaceWith(`<p id="outputMakeElement">Vehicle Make: ${objectValues[0]}</p>`);
      $('#outputModelElement').replaceWith(`<p id="outputModelElement">Vehicle Model: ${objectValues[1]}</p>`);
      $('#outputYearElement').replaceWith(`<p id="outputYearElement">Vehicle Year: ${objectValues[2]}</p>`);
      $('#outputColorElement').replaceWith(`<p id="outputColorElement">Vehicle Color: ${objectValues[3]}</p>`);
    }//converts values to an array and sets html to values
    else {
      $('#inputCol').css('visibility', 'visible');
      $('#outputCol').css('visibility', 'hidden');
    }
  }
}//sets spot number and toggles inputCol visibility

//adding the data attribute to the button elements in the html file and retrieving
//it by using the debugger tool in javascript, as well as expanding multiple objects inside the
//devtools console was taught to me by a friend who I had asked to take a look at my problem.
//I could not figure out how to pick out which button was pressed, so I could assign
//the visual car onto the screen.

const parkCar = () => {
  if (currentCarsParked < maxCars ) {;
    vehicle.sMake = $('#makeType').val();//uses object setter method
    vehicle.sModel = $('#modelType').val();//uses object setter method
    vehicle.sYear = $('#yearNumber').val();//uses object setter method
    vehicle.sColor = $('input[name = "carColor"]:checked').val();//uses object setter method
    vehicle.sSpot = parkingSpotNum;//uses object setter method
    $(`#buttonSpot${parkingSpotNum}`).append(`<img src="images/${vehicle.gColor}Car.png" class="carImg">`)
    //picks and sets image based on stored color value
    parkedCars[parkingSpotNum - 1] = {
      vehicleMake: vehicle.gMake,
      vehicleModel: vehicle.gModel,
      vehicleYear: vehicle.gYear,
      vehicleColor: vehicle.gColor
    }//create new object and adds to specified array position
    currentCarsParked ++;
    $('#inputCol').css('visibility', 'hidden');//hides input column again
    $('#wsMsgThree').show();
    $('#wsMsgTwo').hide();
    return true;
  }
  else {
    console.log('There are too many cars parked here.')
    return false;
  }
} // end parkCar function

const takeForASpin = () => {
  parkedCars.splice(parkingSpotNum - 1, 1, null);//deletes information in array position
  $(`#buttonSpot${parkingSpotNum}`).children().remove();//removes picture from html
  currentCarsParked --;
  $('#outputCol').css('visibility', 'hidden');
  if (currentCarsParked === 0) {
    $('#wsMsgThree').hide();
    $('#wsMsgOne').show();
  }
}

$(document).ready(readyNow);
