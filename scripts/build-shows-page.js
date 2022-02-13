let currentActiveRow = null;

let concerts = [
    {
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tue Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Oct 15 2021",
        venue: "View Lounge ",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 15 2021",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
];
/*
 * initializeShowsSection:
 *   creates the shows section
 *   adds the title
 *   creates the container for each of the cards
 *   returns the cards container object
*/
function initializeShowsSection (title) {
    const main = Q('main');

    const section = C(main, 'section', 'shows');
    // disable active row with any click outside of the rows in the shows section
    section.addEventListener('click', labelsClickHandler);

    C(section, 'h2', 'shows__title', title);

    const showsContainer = C(section, 'div', 'shows__container');
    
    const labels = C(showsContainer, 'div', 'shows__labels');
    labels.addEventListener('click', labelsClickHandler);

    C(labels, 'div', 'shows__label-date', 'DATE');
    C(labels, 'div', 'shows__label-venue', 'VENUE');
    C(labels, 'div', 'shows__label-location', 'LOCATION');
    C(labels, 'div', 'shows__label-place-holder');

    const cards = C(showsContainer, 'section', 'shows__cards');

    return cards;
}

function generateInfoPair (label, value, parent) {

    const infoPair = C(parent, 'div', 'shows__info-pair');

    C(infoPair, 'p', 'shows__info-label', label);

    let infoValue = C(infoPair, 'p', 'shows__info-value', value);

    switch (label) {
        case 'DATE':
            infoValue.classList.add('shows__info-value--date');
            break;
        
        case 'VENUE':
            infoValue.classList.add('shows__info-value--venue');
            break;

        case 'LOCATION':
            infoValue.classList.add('shows__info-value--location');
            break;
        
        default:
    }

    return infoPair;
}

function createShowCard (concert, parent) {
    const card = C(parent, 'div', 'shows__card');
    card.addEventListener('click', rowClickedHandler);
    
    generateInfoPair('DATE', concert.date, card);
    generateInfoPair('VENUE', concert.venue, card);
    generateInfoPair('LOCATION', concert.location, card);
    
    C(card, 'button', 'shows__button', 'BUY TICKETS');
    C(card, 'div', 'shows__divider');

    return card;
}

function rowClickedHandler (e) {
    console.log (e);
    e.stopPropagation();

    // if we are in mobile mode, do nothing
    if (window.innerWidth < 768) return;

    // if we click on the same row multiple times, maintain the current state
    if (currentActiveRow === e.target) return;

    // get the row from the clicked element

    let row = e.target;

    while (!row.classList.contains('shows__card') && !row.classList.contains('main')) {
        row = row.parentElement;
    }

    // if we cannot find the row then an error has occurred. Therefore return in order to keep the code running.
    if (row.classList.contains('main')) return;

    if (currentActiveRow) currentActiveRow.classList.remove('shows__card--active');
    row.classList.add('shows__card--active')

    currentActiveRow = row;
}

function labelsClickHandler (e) {
    e.stopPropagation();

    if (currentActiveRow) {
        currentActiveRow.classList.remove('shows__card--active');
        currentActiveRow = null;
    }
}

let cardsSection = initializeShowsSection('Shows');
let card = {};

for (let i = 0; i < concerts.length; ++i) {
    card = createShowCard(concerts[i], cardsSection);
    // cards.appendChild(card);
}
