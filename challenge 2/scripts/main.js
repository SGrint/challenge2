var time = new Date();

var c = 0;
var imageOffset = 0
var tcc = 0;

let timeZone = 'amsTime';
let timeString = '00:00:00';

document.getElementById('timeZone').innerHTML = 'Amsterdam';

// HANDLING FRAME EVERY 1/60 OF SECOND
function updateTime(){
	updateClock();
	moveRover();
	handleOverlayFade();
}

// UPDATING CLOCK BASED ON TIMEZONE
function updateClock() {
	time = new Date();

	if(timeZone == 'amsTime'){
		timeString = getAmsterdamTime();
	}else if(timeZone == 'txTime'){
		timeString = getTexasTime();
	}

	document.getElementById('timeString').innerHTML = timeString
}

// RETURNING STRING OF AMSTERDAM TIME
function getAmsterdamTime() {
	return addZero(time.getHours())
	+ ":" +
	addZero(time.getMinutes())
	+ ":" +
	addZero(time.getSeconds());
}

// RETURNING STRING OF TEXAS TIME
function getTexasTime() {
	if(time.getHours() > 6){
		return addZero(time.getHours()-7)
		+ ":" +
		addZero(time.getMinutes())
		+ ":" +
		addZero(time.getSeconds());
	}else{
		return addZero(time.getHours()+17)
		+ ":" +
		addZero(time.getMinutes())
		+ ":" +
		addZero(time.getSeconds());
	}
}

// MOVING ROVER SLIGHTLY TO THE RIGHT OR DRAWING IT AT THE START
function moveRover() {
	if(imageOffset < 2500){
		imageOffset += 5
		document.getElementById('rover').style.left = imageOffset + "px";
	}else{
		imageOffset = -500
	}
}

// MAKING CLOUDS MORE VISIBLE EVERY 6 SECONDS
function handleOverlayFade() {
	document.getElementById('overlay').style.opacity = 1.0 / 60 * time.getSeconds();
}

// ADDING ZERO TO NUMBER IF NEEDED
function addZero(number){
	if(number  <10){
		number = '0' + number;
	}
	return number;
}

// HANDLING CLICK ON OVERLAY TO CHANGE TIMEZONES
document.getElementById('overlay').onclick = function(){
	if (timeZone == 'amsTime') {
		timeZone = 'txTime'
		document.getElementById('timeZone').innerHTML = 'Starbase';
	} else if (timeZone == 'txTime') {
		timeZone = 'amsTime'
		document.getElementById('timeZone').innerHTML = 'Amsterdam'
	}
}

// UPDATING EVERY FRAME
setInterval(updateTime, 16);