var Zuruecklegen = false;

var Namen = [];
var counter = 0;
var rounds = 1;
var controlArray = [];

var maxRoundsTillNonPlayerCard = 5;
var roundsTillNonPlayerCard = Math.floor((Math.random() * maxRoundsTillNonPlayerCard) + 1);

var multiTurnsCardTracker = [];

function start() {
  console.log(roundsTillNonPlayerCard);
  var endingCard = findFirstElementZero(multiTurnsCardTracker);
  if(endingCard !== null){
      setBackgroundColor("#c95164");
      document.getElementById("Name").innerHTML = "This card ends now";
      document.getElementById("Runde").innerHTML = "";
      document.getElementById("Card").innerHTML = endingCard;
      $(".playerInfo").show();
  }else{
      decrement(multiTurnsCardTracker);
      if(roundsTillNonPlayerCard == 0){
          roundsTillNonPlayerCard = Math.floor((Math.random() * maxRoundsTillNonPlayerCard) + 1);
          pickCard(false);
      }else{
          pickCard(true);
          cycleThroughNames();
          roundsTillNonPlayerCard--;
      }
  }
}

function pickCard(playerCard) {
  if(playerCard){
    setBackgroundColor("#ffce73");
    $(".playerInfo").show();
    var randomCard = Math.floor(Math.random() * Cards.length);
    document.getElementById("Card").innerHTML = Cards[randomCard][0];
    multiTurnsCardTracker.push(Cards[randomCard]);
    if (Zuruecklegen != true) {
      Cards.splice(randomCard, 1); 
    }
  }else{
    setBackgroundColor("#73ff88");
    var randomCard = Math.floor(Math.random() * npCards.length);
    document.getElementById("Card").innerHTML = npCards[randomCard][0];
    multiTurnsCardTracker.push(npCards[randomCard]);
    if (Zuruecklegen != true) {
      npCards.splice(randomCard, 1); 
    }
    if (npCards.length == 0){
      roundsTillNonPlayerCard = -1;
    }
    $(".playerInfo").hide();
  }
	   
}

function cycleThroughNames() {
	document.getElementById("Name").innerHTML = Namen[counter] + "s Runde";
	document.getElementById("Runde").innerHTML = "Runde " + rounds;
	if(counter < Namen.length - 1){
		counter += 1;
	}else{
		rounds += 1;
		counter = 0;
	}
}

/**
* sets Background Color of body to newColor
*/
function setBackgroundColor(newColor)
{
	$("body").css("backgroundColor", newColor);
}

function findFirstElementZero(array) {
    var cache = null;
    for (var i = 0; i < array.length; i++) {
        if(array[i][1] === 0){
            cache = array[i][0];
            array.splice(i, 1);
            return cache;
        }else if(array[i][1] < 0){
            array.splice(i, 1);
        }
    }
    return cache;
}

function decrement(array) {
    for (var i = 0; i < array.length; i++) {
        array[i][1] = array[i][1] - 1;
    }
}