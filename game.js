var colors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var clickedPattern = [];

var started = false;
var level = 0;

$(".start").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(this).css("display","none");
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
        }, 600);
      }
    } 
    else {
      console.log("wrong");

      $("#level-title").text("Game Over");
      
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 100);

      $(".start").css("display","inline-flex");
      $(".start").text("Try Again");
      
      level = 0;
      gamePattern = [];
      started = false;
    }

}

function nextSequence() {

  clickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(50).fadeOut(50).fadeIn(50);
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
