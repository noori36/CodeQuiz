var questions = [{
        title: "Inside which HTML element do we put the JavaScript??",
        answers: ["<script>", "<scripting>", "<javascript>", "<js>"],
        correctAnswer: "<script>"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        title: "String values must be enclosed within ___ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "commas"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    },
    {
        title: "What two words every programmer learned to code first?",
        answers: ["Hello, world", "JavaScript", "Stackoverflow", "Sudo"],
        correctAnswer: "Hello, world"
    },
    {
        title: "What is the most popular programming problem?",
        answers: ["Typos", "Missing Quotes", "Missing a Semicolon", "Bad Logic"],
        correctAnswer: "Missing a Semicolon"
    },
];

//timer
var timeEl = document.querySelector("#timer");
var secondsLeft = 80;
var timerInterval;

var setTime = function () {
    timerInterval = setInterval(function () {
        secondsLeft--;

        timeEl.textContent = "Time: " + secondsLeft.toString().padStart(2, '0');
        checkTimeRemaining();

    }, 1000);

};
//check time remaining
var checkTimeRemaining = function () {
    if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();

    }
};
//question Index
var questionIndex = 0; // this is equal to i

//body elements
var wholeQuizBodyEl = document.querySelector("#whole-quiz-body");
var quizBodyEl = document.querySelector("#quiz-body");
var quizTitleEl = document.querySelector("#quiz-title");
var quizAnsEl = document.querySelector("#answers");

var initialInputEL = document.querySelector('#initials'); //input field for initials 
var initialSubmitBtn = document.querySelector('#submitBtn'); // save high scores
var startQuizBtnEl = document.querySelector("#startQuizBtn");






var startQuiz = function () {
    // hide the starting screen
    var openScreenEl = document.querySelector("#start-quiz-window");
    openScreenEl.setAttribute("class", "hide");

    // un-hide questions section
    quizBodyEl.removeAttribute("class");

    // start timer
    setTime();

    //renderQuestions
    renderQuestions();


}

var renderQuestions = function () {

    // get current question object from array
    var displayNewQuestion = questions[questionIndex];

    // update title with current question
    quizTitleEl.textContent = displayNewQuestion.title;

    // clear out any old question answers
    quizAnsEl.innerHTML = "";

    //loop over questions
    displayNewQuestion.answers.forEach(function (answer, i) {
        // create new button for each choice
        var answerSelection = document.createElement('button');
        answerSelection.setAttribute("class", "answer");
        answerSelection.setAttribute("value", answer);

        answerSelection.textContent = (i + 1) + ". " + answer;

        // attach click event listener to each answer
        answerSelection.addEventListener('click', questionSelections);
        // answerSelection.onclick = questionClick;

        // display on the page
        quizAnsEl.appendChild(answerSelection);

    });

};

var questionSelections = function () {
    // check if user guessed wrong
    if (this.value !== questions[questionIndex].correctAnswer) {
        // penalize time
        secondsLeft -= 10;
        checkTimeRemaining();
        // display new time on page
        var CheckAnTextEL = document.querySelector("#result");
        timeEl.textContent = secondsLeft;
        CheckAnTextEL.textContent = "Wrong!";
        CheckAnTextEL.style.color = "black";
        CheckAnTextEL.style.fontSize = "150%";

    } else /*if (this.value === questions[questionIndex].correctAnswer) */ {
        var CheckAnTextEL = document.querySelector("#result");
        CheckAnTextEL.textContent = "Correct!";
        CheckAnTextEL.style.color = "black";
        CheckAnTextEL.style.fontSize = "150%";
    }
    // flash Correct/Incorrect feedback
    CheckAnTextEL.setAttribute("class", "result");
    setTimeout(function () {
        CheckAnTextEL.setAttribute("class", "result hide");
    }, 1000);

    // next question
    questionIndex++;


    // time checker
    if (questionIndex > questions.length - 1) {
        endQuiz();
    } else {
        renderQuestions();
    }
}



var endQuiz = function () {
    questionIndex = questions.length;
    // stop timer
    clearInterval(timerInterval);
    console.log(timerInterval);

    if (questionIndex >= questions.length) {

        // hide questions section
        wholeQuizBodyEl.setAttribute("class", "hide");
        // startTextEL.setAttribute("class", "hide");

        var endScreenEl = document.querySelector("#end-quiz");
        endScreenEl.removeAttribute("class");

        // show final score
        var finalScoreEl = document.querySelector("#final-score");
        finalScoreEl.textContent = secondsLeft;

        // hide questions section
        wholeQuizBodyEl.setAttribute("class", "hide");

    }
};


var saveHighScore = function () {
    // get value of input box
    var userInitials = initialInputEL.value.trim();

    if (userInitials !== "") {
        // get saved scores from local storage, or if not any, set to empty array
        var highScores =
            JSON.parse(window.localStorage.getItem("highScores")) || [];

        // format new score object for current user
        var newScore = {
            score: secondsLeft,
            userInitials: userInitials
        };

        // save to local storage
        highScores.push(newScore);
        window.localStorage.setItem("highScores", JSON.stringify(highScores));

        // redirect to next page
        window.location.href = "highscores.html";
    }


};


startQuizBtnEl.addEventListener('click', startQuiz);
console.log("test");