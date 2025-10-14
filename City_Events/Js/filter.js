document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const dateInput = document.getElementById('event-date');
    const locationSelect = document.getElementById('event-location');
    const categorySelect = document.getElementById('event-category');
    const eventCards = document.querySelectorAll('.event-card');
    
    let currentSearch = '';
    let currentDate = '';
    let currentLocation = '';
    let currentCategory = '';
    
    const filterEvents = () => {
        const searchText = currentSearch.toLowerCase().trim();
        const filterDate = currentDate;
        const filterLocation = currentLocation;
        const filterCategory = currentCategory;
        
        eventCards.forEach(card => {
            const eventCategory = card.dataset.category;
            const eventLocation = card.dataset.location;
            const eventDate = card.dataset.date;
            const eventText = (card.querySelector('.card-title').textContent + ' ' + card.querySelector('.card-text').textContent).toLowerCase();
            
            let passesSearch = true;
            let passesDate = true;
            let passesLocation = true;
            let passesCategory = true;
            
            if (searchText) {
                passesSearch = eventText.includes(searchText);
            }
            
            if (filterDate) {
                passesDate = eventDate >= filterDate;
            }
            
            if (filterLocation) {
                passesLocation = eventLocation === filterLocation;
            }
            
            if (filterCategory) {
                passesCategory = eventCategory === filterCategory;
            }
            
            if (passesSearch && passesDate && passesLocation && passesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };
    
    searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value;
        filterEvents();
    });
    
    dateInput.addEventListener('change', () => {
        currentDate = dateInput.value;
        filterEvents();
    });
    
    locationSelect.addEventListener('change', () => {
        currentLocation = locationSelect.value;
        filterEvents();
    });
    
    categorySelect.addEventListener('change', () => {
        currentCategory = categorySelect.value;
        filterEvents();
    });
    
    const applyInitialFilter = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam) {
            categorySelect.value = categoryParam;
            currentCategory = categoryParam;
            filterEvents();
        }
    };
    
    applyInitialFilter();
});