document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const noResultsMessage = document.getElementById('no-results');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop the form from submitting the traditional way

        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            return; // Do nothing if the search is empty
        }

        // Convert the search query to a valid filename
        // "Abilify" -> "abilify"
        // "Acthar Gel" -> "acthar-gel"
        const fileName = query.replace(/\s+/g, '-'); 

        // The path to the potential medication file
        const filePath = `medications/${fileName}.html`;

        // Check if the file actually exists before redirecting
        fetch(filePath, { method: 'HEAD' })
            .then(res => {
                if (res.ok) {
                    // The page exists, so go to it
                    window.location.href = filePath;
                } else {
                    // The page does not exist, show an error
                    noResultsMessage.style.display = 'block';
                }
            })
            .catch(err => {
                console.error("Network error checking file:", err);
                noResultsMessage.style.display = 'block';
            });
    });

    // Hide the error message when the user starts typing again
    searchInput.addEventListener('input', function() {
        if (noResultsMessage.style.display === 'block') {
            noResultsMessage.style.display = 'none';
        }
    });
});