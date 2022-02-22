//used to color the guess of player
let validGuess = 0;
//used to keep track of player guesses
let guessSet = new Set();
//used for score
let score = 0;
//used for time
let secs = 20;

let guessAvg = [];


const statsCompiler = function(){
    //Set and update total games played.
    let gamesPlayed = 1;
    if (localStorage.getItem("gamesPlayed")){
        gamesPlayed = localStorage.getItem("gamesPlayed") + 1;
    }
    localStorage.setItem("gamesPlayed", gamesPlayed);
    
    //updating current score
    localStorage.setItem("currentScore", score);
    
    //Checking and updating highscore, if needed.
    let highScore = 0;
    if(localStorage.getItem("highScore")){
            highScore = localStorage.getItem("highScore")
        }
        
    if(highScore < score){
            highScore = score
            localStorage.setItem("highScore", highScore)
        }
    //Calculating avg. word length per total sessions played, big word stats
    let bigWords = 0;
    let storageLetterLength = 0;
    let storageWordCount = 0;
    if (localStorage.getItem("bigWords")){
        bigWords = localStorage.getItem("bigWords");
    }
    if (localStorage.getItem("storageAvg")){
        storageAvg = localStorage.getItem("storageAvg");
    }
    if (localStorage.getItem("storageAvgLength")){
        storageAvgLength = localStorage.getItem("storageAvgLength");
    }
    for (const word of guessSet){
        storageLetterLength += word.length;
        storageWordCount += 1;
        if (word.length >= 5){
            bigWords += 1;
        }
    }
    localStorage.setItem("bigWords", bigWords);
    localStorage.setItem("storageLetterLength", storageLetterLength);
    localStorage.setItem("storageWordCount", storageWordCount);
}

//Controls timer, clock display, and ending game.
let timer = setInterval(async function(){
    if(secs === 0){
        
        await statsCompiler();
        clearInterval(timer);
        window.location.href = '/finished_game';
    }
    else{
    secs -= 1;
    $("#timer").text("Time: " + secs);
    }

}, 1000)

async function submitGuess(){
    let guess = $("#guess").val();
   
    
    if (guessSet.has(guess)){
        validGuess = 2;
        $("#guessStatus").text("You have already guessed that word");
    }
    else{
    const resp = await axios.get("/guess_check", { params: { word: guess }});
    const respMsg = resp.data.result;
    
    if(respMsg === "not-word"){
        validGuess = 0;
        $("#guessStatus").text("This is not a valid word");
    }
    if(respMsg === "ok"){
        guessSet.add(guess);
        guessAvg.push(guess.length)
        validGuess = 1;
        score += guess.length;
        $("#guessStatus").text("Valid.");
    }
    if(respMsg === "not-on-board"){
        validGuess = 0;
        $("#guessStatus").text("This word is not on the board!");
    }
    
    }
}
// To put the guess on the page and correct color
function appendToTable(){

    let $guess = $('#guess').val();
    let $row = $('<tr>');
    //if guess invalid
    if (validGuess === 0){
        $row.addClass("invalid");
    }
    //if already guessed
    if (validGuess === 2){
        $row.addClass("used");
    }
    //if correct
    else{
        $("#score").text("Your current score: " + score)
        $row.addClass("valid")
    }
    //Run regardless
    $row.text($guess);
    $("#guessTable").append($row);
    
}

$('#submit-btn').click(async function handleEvent(){
    if (secs >= 1){
        await submitGuess();
        appendToTable();
    }
})