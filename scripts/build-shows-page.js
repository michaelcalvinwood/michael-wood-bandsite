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
    C(section, 'h2', 'shows__title', title);

    const showsContainer = C(section, 'div', 'shows__container');
    
    const labels = C(showsContainer, 'div', 'shows__labels');
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
    
    generateInfoPair('DATE', concert.date, card);
    generateInfoPair('VENUE', concert.venue, card);
    generateInfoPair('LOCATION', concert.location, card);
    
    C(card, 'button', 'shows__button', 'BUY TICKETS');
    C(card, 'div', 'shows__divider');

    return card;
}

let cardsSection = initializeShowsSection('Shows');
let card = {};

for (let i = 0; i < concerts.length; ++i) {
    card = createShowCard(concerts[i], cardsSection);
    // cards.appendChild(card);
}
