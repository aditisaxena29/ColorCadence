let gamePattern = [];
let userClickedPattern = [];
let buttonColours=["red","blue","green","yellow"];

let started=false;
let level=0;

$(document).keydown(()=>{
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(event => {
    let userChoosenColour=event.target.id;
    userClickedPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
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

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
