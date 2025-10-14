document.addEventListener('DOMContentLoaded', () => {
    const applyFiltersButton = document.getElementById('applyFilters');
    const searchInput = document.getElementById('eventSearch');
    const dateInput = document.getElementById('eventDate');
    const categorySelect = document.getElementById('eventCategory');
    const eventsListContainer = document.getElementById('eventsList');
    
    const eventCards = eventsListContainer ? eventsListContainer.querySelectorAll('.event-card') : [];
    
    let currentSearch = '';
    let currentDate = '';
    let currentCategory = categorySelect ? categorySelect.value : 'all';

    const filterEvents = () => {
        const searchText = currentSearch.toLowerCase().trim();
        const filterDate = currentDate;
        const filterCategory = currentCategory;
        
        let resultsFound = false;

        if (eventCards.length === 0) return;

        eventCards.forEach(card => {
            const eventCategory = card.dataset.category;
            const eventDate = card.dataset.date;
            
            const eventText = (
                card.querySelector('.card-title').textContent + ' ' + 
                card.querySelector('.card-text.text-muted').textContent + ' ' +
                card.querySelector('.text-primary').textContent 
            ).toLowerCase();
            
            let passesSearch = true;
            let passesDate = true;
            let passesCategory = true;
            
            if (searchText) {
                passesSearch = eventText.includes(searchText);
            }
            
          
            if (filterDate) {
                passesDate = eventDate >= filterDate;
            }
            
            
            if (filterCategory !== 'all') {
                passesCategory = eventCategory === filterCategory;
            }
            
           
            if (passesSearch && passesDate && passesCategory) {
                card.style.display = 'block';
                resultsFound = true;
            } else {
                card.style.display = 'none';
            }
        });

        let noResultsMessage = document.getElementById('noResultsMessage');
        if (!resultsFound) {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.id = 'noResultsMessage';
                noResultsMessage.className = 'alert alert-warning mt-4';
                noResultsMessage.setAttribute('data-key', 'no_events_found');
                eventsListContainer.appendChild(noResultsMessage);
            }
          
            noResultsMessage.textContent = "No events found matching your criteria."; 
            noResultsMessage.style.display = 'block';
        } else {
            if (noResultsMessage) {
                noResultsMessage.style.display = 'none';
            }
        }
    };
    
    if (searchInput) {
        searchInput.addEventListener('input', () => { currentSearch = searchInput.value; });
    }
    
    if (dateInput) {
        dateInput.addEventListener('change', () => { currentDate = dateInput.value; });
    }
    
    if (categorySelect) {
        categorySelect.addEventListener('change', () => { currentCategory = categorySelect.value; });
    }
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', filterEvents);
    }
    const applyInitialFilter = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam && categorySelect) {
            const options = Array.from(categorySelect.options).map(o => o.value);
            if (options.includes(categoryParam)) {
                categorySelect.value = categoryParam;
                currentCategory = categoryParam;
                filterEvents(); 
            }
        } else {
             filterEvents();
        }
    };
    
    applyInitialFilter();
});