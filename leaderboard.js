function displayScores(scores) {
  const scoresList = document.getElementById("scoresList");
  scoresList.innerHTML = ""; // Clear existing scores

  scores.forEach((score) => {
    const li = document.createElement("li");
    li.textContent = `Player: ${score.name} - Score: ${score.score}`;
    scoresList.appendChild(li);
  });
}

function fetchAndDisplayScores() {
  const hiddenElement = document.getElementById("leaderboardData");
  if (hiddenElement) {
    const scores = JSON.parse(hiddenElement.textContent);
    displayScores(scores);
  } else {
    console.log("Leaderboard data not yet available. Retrying...");
    setTimeout(fetchAndDisplayScores, 1000);
  }
}

fetchAndDisplayScores();