function createLeaderboardEntry(entry) {
    const a = document.createElement('a');
    // a.className = "cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring text-content-subdued hover:text-link-hovered hover:bg-surface-hovered";
    a.className = "group flex space-s-3 items-center p-2 rounded-base hover:bg-surface-hovered";
    a.href = `/member/${entry.member_id}`;
    a.dataset.blockId = `link_${entry.rank}`;
    a.dataset.blockName = "link";
  
    const divWrapper = document.createElement('div');
    divWrapper.className = "w-full flex flex-row max-w-full sm:max-w-xs self-center space-s-3 sm:space-s-3.5 md:space-s-4 lg:space-s-5 py-2 sm:py-2.5 lg:py-3 px-2 sm:px-2.5 lg:px-3";
  
    const rankDiv = document.createElement('div');
    rankDiv.className = "text-lg font-medium w-5 text-center flex-shrink-0 whitespace-nowrap";
    rankDiv.dataset.blockId = `rank_${entry.rank}`;
    rankDiv.dataset.blockName = "text";
    rankDiv.textContent = entry.rank;
  
    const imgDiv = document.createElement('div');
    imgDiv.className = "relative shrink-0 rounded-avatar shrink-0 h-[2.5rem] w-[2.5rem]";
    imgDiv.dataset.blockId = `image_${entry.rank}`;
    imgDiv.dataset.blockName = "image";
  
    const imgSrc = entry.profile_pic_id ? `https://tribe-s3-production.imgix.net/${entry.profile_pic_id}?fit=max&amp;w=1000&amp;auto=compress,format` : "https://s3-us-west-2.amazonaws.com/slack-files2/bot_icons/2023-11-10/6191253567169_48.png";
    const img = document.createElement('img');
    img.className = "shrink-0 rounded-avatar h-[2.5rem] w-[2.5rem] object-cover object-center";
    img.src = imgSrc;
    img.width = 40; // 2.5rem to px
    img.height = 40;
    
    imgDiv.appendChild(img);
  
    const nameDiv = document.createElement('div');
    nameDiv.className = "flex-1 text-content truncate";
    nameDiv.dataset.blockId = `name_${entry.rank}`;
    nameDiv.dataset.blockName = "text";
    nameDiv.textContent = entry.name;
  
    const scoreDiv = document.createElement('div');
    scoreDiv.className = "px-1 text-content-subdued";
    scoreDiv.dataset.blockId = `score_${entry.rank}`;
    scoreDiv.dataset.blockName = "text";
    scoreDiv.textContent = entry.score;
  
    a.appendChild(rankDiv);
    a.appendChild(imgDiv);
    a.appendChild(nameDiv);
    a.appendChild(scoreDiv);

    return a;
}

function displayScores(leaderboardData) {
  const leaderboardContent = document.getElementById("leaderboard-content");
  leaderboardContent.innerHTML = ""; // Clear existing scores

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