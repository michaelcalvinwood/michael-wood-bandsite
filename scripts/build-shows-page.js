const apiKey = "f3bd5bed-c466-449a-bc93-1d14dc589719";
const baseUrl = "https://project-1-api.herokuapp.com/";

/*
 * Note to instructor:
 * I was unsure whether the mobile version counts as rows regarding clicking them.
 * Therefore, I created the excludeMobile variable so the clicking behavior can be excluded by setting this to true
 */
const excludeMobile = false;

let currentActiveRow = null;

// let concerts = [
//     {
//         date: "Mon Sept 06 2021",
//         venue: "Ronald Lane",
//         location: "San Francisco, CA"
//     },
//     {
//         date: "Tue Sept 21 2021",
//         venue: "Pier 3 East",
//         location: "San Francisco, CA"
//     },
//     {
//         date: "Fri Oct 15 2021",
//         venue: "View Lounge ",
//         location: "San Francisco, CA"
//     },
//     {
//         date: "Sat Nov 06 2021",
//         venue: "Hyatt Agency",
//         location: "San Francisco, CA"
//     },
//     {
//         date: "Fri Nov 26 2021",
//         venue: "Moscow Center",
//         location: "San Francisco, CA"
//     },
//     {
//         date: "Wed Dec 15 2021",
//         venue: "Press Club",
//         location: "San Francisco, CA"
//     }
// ];
/*
 * initializeShowsSection:
 *   creates the shows section
 *   adds the title
 *   creates the container for each of the cards
 *   returns the cards container object
*/
function initializeShowsSection (title) {
    const main = document.querySelector('main');

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
/*
 * generateInfoPair creates the container for the label and value and attaches to the parent
 * @param label (String): the field type for the concert value (e.g. date, venue, location)
 * @param value (String): the value associated with the provided field type
 * @param parent (Element): the parent to attached the created container
 * @return Element: the created container element
 */
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

/* createShowCard creates the individual show cards based on the show object
 * @param concert (Obj): the show object
 * @param parent (Element): the parent to attach the show card to
 * @return Element: the created show card
 */
function createShowCard (concert, parent) {
    let date = new Date(Number(concert.date))
        .toString()
        .split(' ')
        .slice(0, 4)
        .join(' ');
   
    console.log ('date', date)

    const card = C(parent, 'div', 'shows__card');
    card.addEventListener('click', rowClickedHandler);
    
    generateInfoPair('DATE', date, card);
    generateInfoPair('VENUE', concert.place, card);
    generateInfoPair('LOCATION', concert.location, card);
    
    C(card, 'button', 'shows__button', 'BUY TICKETS');
    C(card, 'div', 'shows__divider');

    return card;
}

/*
 * rowClickedHandler handles the 'click' event for each row
 * @param e (event): the row 'click' event
 */
function rowClickedHandler (e) {
    console.log(e);
    e.stopPropagation();
 
    if (window.innerWidth < 768 && excludeMobile) return;

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
/*
 * labelsClickHandler is triggered by each of two click events: clicking the labels or clicking the Shows section outside of the table
 * This function removes the active state from any row that may currently have the active state
 * @param e (Event): the click events from either the labels or from the shows area
 */
function labelsClickHandler (e) {
    console.log('labelsClickHandler', e);
    e.stopPropagation();

    if (currentActiveRow) {
        currentActiveRow.classList.remove('shows__card--active');
        currentActiveRow = null;
    }
}
let cardsSection = initializeShowsSection('Shows');

function getShowDates () {
    const request = {
        url: baseUrl + `showdates?api_key=${apiKey}`,
        method: 'get'
    }

    axios (request)
    .then (response => {
        console.log ('success', response.data);
        
        let card = {};

        for (let i = 0; i < response.data.length; ++i) {
            card = createShowCard(response.data[i], cardsSection);
        }

    })
    .catch (error => {
        console.log ('error', error)
    }) 
}

getShowDates();