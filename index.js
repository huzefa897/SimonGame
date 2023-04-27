var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
started = false;

$(".btn").click(function () {

    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    //console.log(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});
function playSound(name) {
    var mySound = new Audio(name + ".mp3");
    mySound.play();
}
function nextSequence() {
    var random = Math.floor(Math.random() * 4);
    var randomChosenColour = [];
    randomChosenColour = buttonColours[random];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    $("#level-title").text("Level " + level);
    
}
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct");
        if (userClickedPattern.length === gamePattern.length) {
            level++;
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        console.log("Wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
        $("body").removeClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart")
        var wrong=new Audio("wrong.mp3");
        wrong.play();
    },500);
        startOver();

}
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    userClickedPattern=[];
}

//For Mobile
$(document).on("tap",function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("tap",function () {

    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    //console.log(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});
