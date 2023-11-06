var colors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var clickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var choosenColor = $(this).attr("id");
  clickedPattern.push(choosenColor);

  playSound(choosenColor);
  animatePress(choosenColor);

  checkAnswer(clickedPattern.length-1);
});


function checkAnswer(curLevel) {
    if (gamePattern[curLevel] === clickedPattern[curLevel]) {

      console.log("success");

      if (clickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      
      startOver();
    }

}

function nextSequence() {

  clickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
