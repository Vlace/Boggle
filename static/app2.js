highScore = localStorage.getItem("highScore");
currentScore = localStorage.getItem("currentScore");
bigWords = localStorage.getItem("bigWords");
storageLetterLength = localStorage.getItem("storageLetterLength");
storageWordCount = localStorage.getItem("storageWordCount");
gamesPlayed = localStorage.getItem("gamesPlayed");
longestWordLength = localStorage.getItem("longestWordLength");

avgWordLength = storageLetterLength / storageWordCount;
avgScore = storageLetterLength / gamesPlayed;
$(".gameScore").text("Your score is: " + currentScore);
$(".highScore").text("Your high score is: " + highScore);
$(".avgScore").text("Your average score is: " + avgScore)
$(".bigWords").text("Total words with 5+ letters: " + bigWords);
$(".longestWord").text("Your longest word is: " + longestWordLength);
$(".gamesPlayed").text("Games Played: " + gamesPlayed);