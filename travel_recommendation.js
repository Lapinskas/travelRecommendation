const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('results');

let travelData = null;

// Fetch JSON
fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log('Loaded data:', data);
    })
    .catch(error => console.error('Fetch error:', error));

// Normalize keyword
function normalizeKeyword(keyword) {
    return keyword.toLowerCase().trim();
}

// Get recommendations
function getRecommendations(keyword) {
    if (!travelData) return [];

    if (keyword === 'beach' || keyword === 'beaches') {
        return travelData.beaches;
    }

    if (keyword === 'temple' || keyword === 'temples') {
        return travelData.temples;
    }

    if (keyword === 'country' || keyword === 'countries') {
        return travelData.countries.flatMap(country => country.cities);
    }

    return [];
}

// Render results
function renderResults(items) {
    resultsContainer.innerHTML = '';

    items.slice(0, 2).forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg overflow-hidden shadow text-gray-800';

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${item.name}</h3>
                <p class="text-sm text-gray-600 mb-4">${item.description}</p>
                <button class="px-4 py-2 bg-teal-600 text-white text-sm rounded hover:bg-teal-700">
                    Visit
                </button>
            </div>
        `;

        resultsContainer.appendChild(card);
    });
}

// Search click
searchBtn.addEventListener('click', () => {
    const keyword = normalizeKeyword(searchInput.value);
    const results = getRecommendations(keyword);

    renderResults(results);
});

// Clear click
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    resultsContainer.innerHTML = '';
});
