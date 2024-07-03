if (!window.location.pathname.includes('/member/')) {
    document.addEventListener('DOMContentLoaded', function() {
        fetchScores();
    });
}

async function fetchScores() {
    try {
        const response = await fetch('https://xvrs-fsxb-w8c7.n7c.xano.io/api:EVuVOmW4/html/leaderboard');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        // Store data in a hidden element
        const hiddenElement = document.createElement('div');
        hiddenElement.id = 'leaderboardData';
        hiddenElement.style.display = 'none';
        hiddenElement.textContent = JSON.stringify(data);
        document.body.appendChild(hiddenElement);
    } catch (error) {
        console.error('Error fetching scores:', error);
    }
}