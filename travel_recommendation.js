fetch('./travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Travel recommendation data:', data);

    })
    .catch(error => {
        console.error('Error fetching travel recommendations:', error);
    });
