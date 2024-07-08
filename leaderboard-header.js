document.addEventListener('DOMContentLoaded', function() {
    const validPaths = ['/member', '/feed', '/testing'];
    const currentPath = window.location.pathname;
    if (validPaths.some(path => currentPath.startsWith(path))) {
        fetchScores(currentPath);
    }
});

async function fetchScores(currentPath) {
    const member_id = __BM_DATA__.authToken.member.id;
    let query_url = '';
    if (currentPath.startsWith('/member')) {
        query_url = `https://xvrs-fsxb-w8c7.n7c.xano.io/api:EVuVOmW4/html/profile/leaderboard?member_id=${member_id}`;
    } else if (currentPath.startsWith('/feed') || currentPath.startsWith('/testing')) {
        query_url = `https://xvrs-fsxb-w8c7.n7c.xano.io/api:EVuVOmW4/html/leaderboard?member_id=${member_id}`;
    }
    console.log(query_url);
    if (query_url) {
        try {
            const response = await fetch(query_url);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();

            // Optionally display or use data here
            displayScores(data);
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    } else {
        console.log('No valid API endpoint found for this path:', currentPath);
    }
}


// if (!window.location.pathname.includes('/member/')) {
//     document.addEventListener('DOMContentLoaded', function() {
//         fetchScores();
//     });
// }

// async function fetchScores() {
//     try {
//         const member_id = __BM_DATA__.authToken.member.id;
//         const query_url = `https://xvrs-fsxb-w8c7.n7c.xano.io/api:EVuVOmW4/html/leaderboard?member_id=${member_id}`;
//         console.log(query_url);
//         const response = await fetch(query_url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }

//         const data = await response.json();

//         // Store data in a hidden element
//         const hiddenElement = document.createElement('div');
//         hiddenElement.id = 'leaderboardData';
//         hiddenElement.style.display = 'none';
//         hiddenElement.textContent = JSON.stringify(data);
//         document.body.appendChild(hiddenElement);
//     } catch (error) {
//         console.error('Error fetching scores:', error);
//     }
// }
// function displayScores(scores) {
//     const scoresList = document.getElementById('scoresList');
//     scoresList.innerHTML = '';  // Clear existing scores

//     scores.forEach(score => {
//         const li = document.createElement('li');
//         li.textContent = `Player: ${score.player} - Score: ${score.score}`;
//         scoresList.appendChild(li);
//     });
// }