const username = 'DIttoSensei'; // Update this!

async function fetchRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        
        const grid = document.getElementById('repo-grid');
        grid.innerHTML = ''; // Clear loading text

        repos.forEach(repo => {
            // Only show repos that aren't forks
            if (!repo.fork) {
                const card = `
                <a href="${repo.html_url}" target="_blank" class="group block p-8 border border-black hover:bg-black hover:text-white transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <span class="text-xs font-mono text-gray-400 group-hover:text-gray-300 uppercase">${repo.language || 'Code'}</span>
                        <svg class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">${repo.name}</h3>
                    <p class="text-gray-500 group-hover:text-gray-300 text-sm line-clamp-2">${repo.description || 'No description provided.'}</p>
                    <div class="mt-6 flex items-center gap-4 text-xs font-bold">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>
                </a>
                `;
                grid.innerHTML += card;
            }
        });
    } catch (error) {
        console.error('Error fetching repos:', error);
    }
}

fetchRepos();