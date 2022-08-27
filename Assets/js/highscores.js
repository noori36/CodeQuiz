var scoreTextEl = document.querySelector("#scoreText");
        scoreTextEl.textContent = "Quiz yourself to see the High Score!";


        // go back button to main page
        document.getElementById("btnBack").onclick = function (event) {
            document.location.href = "index.html";
        }

        // clear high scores button button
        document.getElementById("btnClear").onclick = function (event) {
            scoreTextEl.textContent = "";
            localStorage.removeItem("highScores");
            console.log("testing button click");
            highScores.textContent = "All High Scores have been Cleared!";



        }

        function displayHighScores() {


            // either get scores from local storage or set to empty array
            var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];

            // sort high scores by score property in descending order
            highScores.sort(function (a, b) {
                return b.score - a.score;
            });

            highScores.forEach(function (score) {
                // create li tag for each high score
                var liEl = document.createElement("li");
                liEl.textContent = score.userInitials + " - " + score.score;

                // display on page
                var olEl = document.getElementById("highScores");
                olEl.appendChild(liEl);

            });
        }

        // run function when page loads
        displayHighScores();