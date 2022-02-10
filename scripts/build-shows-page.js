
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
]





 



/*
 * initializeShowsSection:
 *   creates the shows section
 *   adds the title
 *   creates the container for each of the cards
 *   returns the cards container object
*/
function initializeShowsSection (title) {
    const main = document.querySelector('main');

    const section = document.createElement('section');
    section.classList.add('shows');

    const h2 = document.createElement('h2');
    h2.classList.add('shows__title');
    h2.innerText = title;
    section.appendChild(h2);

    const showsContainer = document.createElement('div');
    showsContainer.classList.add('shows__container');
    section.appendChild(showsContainer);

    const labels = document.createElement('div');
    labels.classList.add('shows__labels');
    showsContainer.appendChild(labels);

    const labelDate = document.createElement('div');
    labelDate.classList.add('shows__label-date');
    labelDate.innerText = 'DATE';
    labels.appendChild(labelDate);

    const labelVenue = document.createElement('div');
    labelVenue.classList.add('shows__label-venue');
    labelVenue.innerText = 'VENUE';
    labels.appendChild(labelVenue);

    const labelLocation = document.createElement('div');
    labelLocation.classList.add('shows__label-location');
    labelLocation.innerText = 'LOCATION';
    labels.appendChild(labelLocation);

    const labelPlaceHolder = document.createElement('div');
    labelPlaceHolder.classList.add('shows__label-place-holder');
    labels.appendChild(labelPlaceHolder);

    let cards = document.createElement('section');
    cards.classList.add('shows__cards')
    showsContainer.appendChild(cards);

    main.appendChild(section);

    return cards;
}

function generateInfoPair (label, value) {
    let infoPair = document.createElement('div');
    infoPair.classList.add('shows__info-pair');

    let infoLabel = document.createElement('p');
    infoLabel.classList.add('shows__info-label');
    infoLabel.innerText = label;
    infoPair.appendChild(infoLabel);

    let infoValue = document.createElement('p');
    infoValue.classList.add('shows__info-value');
    infoValue.innerText = value;
    
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
    infoPair.appendChild(infoValue);

    return infoPair;
}

function createShowCard (concert) {
    let card = document.createElement('div');
    card.classList.add('shows__card');
    
    let infoPair = generateInfoPair('DATE', concert.date);
    card.appendChild(infoPair);

    infoPair = generateInfoPair('VENUE', concert.venue);
    card.appendChild(infoPair);

    infoPair = generateInfoPair('LOCATION', concert.location);
    card.appendChild(infoPair);

    let cardButton = document.createElement('button');
    cardButton.classList.add('shows__button');
    cardButton.innerText="BUY TICKETS";
    card.appendChild(cardButton);

    let divider = document.createElement('div');
    divider.classList.add('shows__divider');
    card.appendChild(divider);

    return card;
}

let cards = initializeShowsSection('Shows');
let card = {};

for (let i = 0; i < concerts.length; ++i) {
    card = createShowCard(concerts[i]);
    cards.appendChild(card);
}
