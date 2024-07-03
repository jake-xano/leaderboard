
  
  function createLeaderboardEntry(entry) {
    const a = document.createElement('a');
    a.className = "cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring text-content-subdued hover:text-link-hovered hover:bg-surface-hovered";
    a.href = `/member/${entry.member_id}`;
    a.dataset.blockId = `link_${entry.rank}`;
    a.dataset.blockName = "link";
  
    const div = document.createElement('div');
    div.className = "w-full flex flex-row max-w-full sm:max-w-xs self-center space-s-3 sm:space-s-3.5 md:space-s-4 lg:space-s-5 py-2 sm:py-2.5 lg:py-3 px-2 sm:px-2.5 lg:px-3";
  
    const rankSpan = document.createElement('span');
    rankSpan.className = "text-center text-lg w-5 flex-shrink-0 font-medium whitespace-nowrap";
    rankSpan.dataset.blockId = `rank_${entry.rank}`;
    rankSpan.dataset.blockName = "text";
    rankSpan.textContent = entry.rank;
  
    const imgDiv = document.createElement('div');
    imgDiv.className = "relative shrink-0 rounded-avatar h-[2.5rem] w-[2.5rem] flex block-image";
    imgDiv.dataset.blockId = `image_${entry.rank}`;
    imgDiv.dataset.blockName = "image";
  
    const imgSrc = entry.profile_pic_id ? `https://tribe-s3-production.imgix.net/${entry.profile_pic_id}?fit=max&amp;w=1000&amp;auto=compress,format` : "https://s3-us-west-2.amazonaws.com/slack-files2/bot_icons/2023-11-10/6191253567169_48.png";
    const img = document.createElement('img');
    img.className = "shrink-0 rounded-avatar h-[2.5rem] w-[2.5rem] object-cover object-center";
    img.src = imgSrc;
    img.width = 40; // 2.5rem to px
    img.height = 40;
    
    imgDiv.appendChild(img);
  
    const nameSpan = document.createElement('span');
    nameSpan.className = "text-md truncate flex-1 leaderboard-name";
    nameSpan.dataset.blockId = `name_${entry.rank}`;
    nameSpan.dataset.blockName = "text";
    nameSpan.textContent = entry.name;
  
    const scoreSpan = document.createElement('span');
    scoreSpan.className = "text-end text-md block-text";
    scoreSpan.dataset.blockId = `score_${entry.rank}`;
    scoreSpan.dataset.blockName = "text";
    scoreSpan.textContent = entry.score;
  
    div.appendChild(rankSpan);
    div.appendChild(imgDiv);
    div.appendChild(nameSpan);
    div.appendChild(scoreSpan);
  
    a.appendChild(div);
  
    return a;
  }
  
//   const leaderboardContent = document.getElementById('leaderboard-content');
  
//   leaderboardData.forEach(entry => {
//     const leaderboardEntry = createLeaderboardEntry(entry);
//     leaderboardContent.appendChild(leaderboardEntry);
//   });

//// v1 ////

function displayScores(leaderboardData) {
  const leaderboardContent = document.getElementById("leaderboard-content");
  leaderboardContent.innerHTML = ""; // Clear existing scores

//   v1
//   scores.forEach((score) => {
//     const li = document.createElement("li");
//     li.textContent = `Player: ${score.name} - Score: ${score.score}`;
//     scoresList.appendChild(li);
//   });
//   v2
leaderboardData.forEach((entry) => {
    const leaderboardEntry = createLeaderboardEntry(entry);
    leaderboardContent.appendChild(leaderboardEntry);
  });
}

function fetchAndDisplayScores() {
  const hiddenElement = document.getElementById("leaderboardData");
  if (hiddenElement) {
    const leaderboardData = JSON.parse(hiddenElement.textContent);
    displayScores(leaderboardData);
  } else {
    console.log("Leaderboard data not yet available. Retrying...");
    setTimeout(fetchAndDisplayScores, 1000);
  }
}

fetchAndDisplayScores();