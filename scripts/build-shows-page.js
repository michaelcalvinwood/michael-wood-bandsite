
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
    let main = document.querySelector('main');

    let section = document.createElement('section');
    section.classList.add('shows');

    let h2 = document.createElement('h2');
    h2.classList.add('shows__title');
    h2.innerText = title;
    section.appendChild(h2);

    let cards = document.createElement('section');
    cards.classList.add('shows__cards')
    section.appendChild(cards);

    main.appendChild(section);

    return cards;
}

function generateInfoPair (label, value) {
    let infoPair = document.createElement('div');
    infoPair.classList.add('shows_info-pair');

    let infoLabel = document.createElement('p');
    infoLabel.classList.add('shows__info-label');
    infoLabel.innerText = label;
    infoPair.appendChild(infoLabel);

    let infoValue = document.createElement('p');
    infoValue.classList.add('shows__info-value');
    infoValue.innerText = value;
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
