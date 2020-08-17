const timeLeft = document.querySelector("#timer");
const currScore = document.querySelector("#high-score");
const currWord = document.querySelector("#word");
const words = [
    "test", "word", "dog", "cat", "jober", "never", "gonna", "give", "you", "up"
];

document.getElementById("inputlg").focus();
let gameActive = false;
let randomWord;
let time = 10;
let score = 0;
currScore.innerHTML = "Score: " + score;
timeLeft.innerHTML = time + "s";

function checkStart(event) {
    let input = event.target.value.toLowerCase();
    if (gameActive == false) {
        if (input.toLowerCase() == "start") {
            console.log("test");
            document.getElementById("inputlg").value = "";
            document.getElementById("inputlg").placeholder = "";
            startGame();
        }
    }
}

function resetStart() {
    console.log("test");
    document.getElementById("inputlg").value = "";
    document.getElementById("inputlg").placeholder = "";
    startGame();
}

function startGame() {
    gameActive = true;
    score = 0;
    currScore.innerHTML = "Score: " + score;
    if (gameActive == true) {
        let countdown = setInterval(function() {
            if (time <= 0) {
                gameActive = false;
                clearInterval(countdown);
                time = 10;
                gameOver();
            } else {
                time -= 1;
                timeLeft.innerHTML = time + "s";
            }   
        }, 1000);
        gameLoop();
    }
}

function gameLoop() {
    if (gameActive == true) {
        getRandomWord();
        addWordToDOM();
        var input = document.getElementById("inputlg").value;

        console.log(randomWord);

        document.getElementById("inputlg").addEventListener("input", function(event) {
            var input = event.target.value.toLowerCase();
            if (input == randomWord && gameActive == true) {
                document.getElementById("inputlg").value = "";
                score += 1;
                currScore.innerHTML = "Score: " + score;
                gameLoop();
            }
        });
    }
}

function gameOver() {
    currWord.innerHTML = "Game over!";
    document.getElementById("inputlg").placeholder = "Type \"start\" to play again";
    document.getElementById("inputlg").addEventListener("input", function(event) {
        let input = event.target.value.toLowerCase();
        if (input == "start") {
            resetStart();
        }
    });
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    currWord.innerHTML = randomWord;
}