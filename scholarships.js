document.addEventListener("DOMContentLoaded", function() {
    const scholarshipsList = document.getElementById('scholarships-list');

    // Fetch scholarship data from JSON file
    fetch('scholarships-list.json')
        .then(response => response.json())
        .then(data => {
            const scholarships = data.scholarships;
            displayScholarships(scholarships);
        })
        .catch(error => console.log('Error loading data:', error));

    // Function to display scholarship cards
    function displayScholarships(scholarships) {
        scholarshipsList.innerHTML = '';
        scholarships.forEach(scholarship => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${scholarship.name}</h3>
                <p>${scholarship.eligibility}</p>
                <p><strong>Benefits:</strong> ${scholarship.benefits}</p>
                <p><strong>Deadline:</strong> ${scholarship.deadline}</p>
                <button class="cta" onclick="window.location.href='${scholarship.applyLink}'">Apply Now</button>
            `;
            scholarshipsList.appendChild(card);
        });
    }

    // Search button click event
    document.getElementById('search-btn').addEventListener('click', function() {
        const category = document.getElementById('category-filter').value;
        const deadline = document.getElementById('deadline-filter').value;
        filterScholarships(category, deadline);
    });

    function filterScholarships(category, deadline) {
        fetch('scholarships.json')
            .then(response => response.json())
            .then(data => {
                const filteredScholarships = data.scholarships.filter(scholarship => {
                    const isCategoryMatch = category === 'all' || scholarship.name.toLowerCase().includes(category.toLowerCase());
                    const isDeadlineMatch = deadline === 'all' || (deadline === 'upcoming' && new Date(scholarship.deadline) > new Date()) || (deadline === 'past' && new Date(scholarship.deadline) < new Date());
                    return isCategoryMatch && isDeadlineMatch;
                });
                displayScholarships(filteredScholarships);
            });
    }
});
