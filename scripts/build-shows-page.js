const apiKey = "f3bd5bed-c466-449a-bc93-1d14dc589719";
const baseUrl = "https://project-1-api.herokuapp.com/";

let currentActiveRow = null;

/*
 * createElement: Creates a child element and appends to parent
 * @param parent (Element): parent element to attach child to
 * @param tag (String): element tag to create
 * @param c (String): optional class(es) of the element. Multiple classes are allowed when separated by a space.
 * @param text (String): optional innerText of the element
 * @param attributes (Obj): optional object whose key/value pairs will be added to the element
 * @return Element on success (the created child element); false on error (if tag contains invalid characters). 
 */
 
function createElement (parent, tag, c = false, text = false, attributes = false) {
    let el = {};
    try {
        el = document.createElement(tag);
    } catch (e) {
        return false;
    }

    parent.appendChild(el);
    
    // optional parameters
    if (c) el.className = c; 
    if (text) el.innerText = text;
    if (attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            el.setAttribute (key, value);
        };
    }

    return el
}

/*
 * initializeShowsSection:
 *   creates the shows section
 *   adds the title
 *   creates the container for each of the cards
 *   returns the cards container object
*/
function initializeShowsSection (title) {
    const main = document.querySelector('main');

    const section = createElement(main, 'section', 'shows');
    // disable active row with any click outside of the rows in the shows section
    section.addEventListener('click', labelsClickHandler);

    createElement(section, 'h2', 'shows__title', title);

    const showsContainer = createElement(section, 'div', 'shows__container');
    
    const showsLabelContainer = createElement(showsContainer, 'div', 'shows__labels-container');

    const labels = createElement(showsLabelContainer, 'div', 'shows__labels');
    labels.addEventListener('click', labelsClickHandler);

    createElement(labels, 'div', 'shows__label-date', 'DATE');
    createElement(labels, 'div', 'shows__label-venue', 'VENUE');
    createElement(labels, 'div', 'shows__label-location', 'LOCATION');
    createElement(labels, 'div', 'shows__label-place-holder');

    const cards = createElement(showsContainer, 'section', 'shows__cards');

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

    const infoPair = createElement(parent, 'div', 'shows__info-pair');

    createElement(infoPair, 'p', 'shows__info-label', label);

    let infoValue = createElement(infoPair, 'p', 'shows__info-value', value);

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

    const card = createElement(parent, 'div', 'shows__card shows__card--inactive');
    card.addEventListener('click', rowClickedHandler);

    const cardContainer = createElement (card, 'div', 'shows__card-container');
    
    generateInfoPair('DATE', date, cardContainer);
    generateInfoPair('VENUE', concert.place, cardContainer);
    generateInfoPair('LOCATION', concert.location, cardContainer);
    
    createElement(cardContainer, 'button', 'shows__button', 'BUY TICKETS');

    return card;
}

/*
 * rowClickedHandler handles the 'click' event for each row
 * @param e (event): the row 'click' event
 */
function rowClickedHandler (e) {
    e.stopPropagation();

    // if we click on the same row multiple times, maintain the current state
    if (currentActiveRow === e.target) return;

    // get the row from the clicked element

    let row = e.target;

    while (!row.classList.contains('shows__card') && !row.classList.contains('main')) {
        row = row.parentElement;
    }

    // if we cannot find the row then an error has occurred. Therefore return in order to keep the code running.
    if (row.classList.contains('main')) return;

    if (row === currentActiveRow) return;

    if (currentActiveRow) {
        currentActiveRow.classList.remove('shows__card--active');
        currentActiveRow.classList.add('shows__card--inactive')
    }

    row.classList.add('shows__card--active')
    row.classList.remove('shows__card--inactive');
    currentActiveRow = row;
}
/*
 * labelsClickHandler is triggered by each of two click events: clicking the labels or clicking the Shows section outside of the table
 * This function removes the active state from any row that may currently have the active state
 * @param e (Event): the click events from either the labels or from the shows area
 */
function labelsClickHandler (e) {
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
        let card = {};

        for (let i = 0; i < response.data.length; ++i) {
            card = createShowCard(response.data[i], cardsSection);
        }
    })
    .catch (error => {}) 
}

getShowDates();