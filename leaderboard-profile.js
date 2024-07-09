function createLeaderboardEntry(entry) {
  const scoreWrapper = document.createElement('div');
  scoreWrapper.className = "group flex space-s-3 items-center p-2 rounded-base";

  const monthName = document.createElement('div');
  monthName.className = "flex-1 text-content truncate";
  monthName.textContent = entry.month_text;

  const scoreDiv = document.createElement('div');
  scoreDiv.className = "px-1 text-content-subdued";
  scoreDiv.textContent = entry.score;

  scoreWrapper.appendChild(monthName);
  scoreWrapper.appendChild(scoreDiv);

  return scoreWrapper;
}
  
function displayScores(leaderboardData) {
  const leaderboardContent = document.getElementById("leaderboard-profile");
  leaderboardContent.innerHTML = ""; // Clear existing scores

leaderboardData.forEach((entry) => {
    const leaderboardEntry = createLeaderboardEntry(entry);
    leaderboardContent.appendChild(leaderboardEntry);
  });
}

function fetchAndDisplayScores() {
  const hiddenElement = document.getElementById("leaderboardProfileData");
  if (hiddenElement) {
    const leaderboardData = JSON.parse(hiddenElement.textContent);
    displayScores(leaderboardData);
  } else {
    console.log("Leaderboard data not yet available. Retrying...");
    setTimeout(fetchAndDisplayScores, 1000);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  fetchAndDisplayScores();
});

