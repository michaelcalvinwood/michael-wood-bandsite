const apiKey = "f3bd5bed-c466-449a-bc93-1d14dc589719";
const baseUrl = "https://project-1-api.herokuapp.com/";

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
 * initializeAddCommentSection creates the input form and appends it to main
 */
function initializeAddCommentSection () {
    document.querySelector('form').addEventListener('submit', formHandler);
}

/*
 * displayComment creates and returns an individual comment card
 */
function displayComment (parent, comment, index) {
    let avatar = {};

    let commentCard = {};

    if (index === 0) {
        commentCard = createElement(parent, 'div', 'submitted-comments__comment-card submitted-comments__comment-card--first-comment')
    } else {
        commentCard = createElement(parent, 'div', 'submitted-comments__comment-card')
    }
    
    let displayContainer = createElement(commentCard, 'div', 'submitted-comments__display-container');

    if (comment.avatar) {
        createElement(displayContainer, 'img', 'submitted-comments__avatar', '', {src: comment.avatar, alt: 'avatar'});
    } else {
        avatar = createElement(displayContainer, 'div', 'submitted-comments__avatar');
    }
    
    const commentCardContainer = createElement(displayContainer, 'div', 'submitted-comments__info');

    const nameTimeContainer = createElement(commentCardContainer, 'div', 'submitted-comments__name-time-container');
    
    createElement(nameTimeContainer, 'p', 'submitted-comments__name', comment.name);

    createElement(nameTimeContainer, 'p', 'submitted-comments__timestamp', displayLiveDate(comment.timestamp));

    createElement(commentCardContainer, 'p', 'submitted-comments__comment', comment.comment);

    const submittedCommentsButtonsContainer = createElement(commentCardContainer, 'div', 'submitted-comments__buttons-container');

    if (comment.likes !== 1) {
        createElement (submittedCommentsButtonsContainer, 'p', 'submitted-comments__likes-count', `${comment.likes} likes`);
    }
    else {
        createElement (submittedCommentsButtonsContainer, 'p', 'submitted-comments__likes-count', `1 like`);
    }
    
    const submittedCommentsButtons = createElement (submittedCommentsButtonsContainer, 'div', 'submitted-comments__buttons');

    const likeButton = createElement (submittedCommentsButtons, 'img', 'submitted-comments__like-button', '', {src: '/assets/icons/icon-like.svg', alt: 'like-button'});

    likeButton.addEventListener('click', (e) => {
        addLike(comment.id);
    })

    const deleteButton = createElement (submittedCommentsButtons, 'img', 'submitted-comments__delete-button', '', {src: '/assets/icons/icon-delete.svg', alt: 'like-button'});
    
    deleteButton.addEventListener('click', (e) => {
        deleteComment(comment.id);
    })

    return commentCard;
}

/*
 * updateSubmittedComments clears the provided section and then populates it with the contents the comments array
 * @param submittedCommentsSection (Element): the element of the section that will house the comments
 */
function updateSubmittedComments (submittedCommentsSection) {
    submittedCommentsSection.innerHTML = '';

    for (let i = 0; i < comments.length; i++) {
        displayComment (submittedCommentsSection, comments[i], i);
    }
}

/*
 * displayLiveUpdate transforms the timestamp into a human readable output
 * @param timestamp (seconds): the number of seconds since epoch. If date is provided then date is converted to seconds since epoch.
 * @return String: formatted output to display the comment time
 */
function displayLiveDate (timestamp) {
    timestamp = Number(timestamp);

    const currentTime = Date.now();
    let diff = (currentTime - timestamp) / 1000;
    diff = Math.trunc(diff);

    if (diff < 2) return "now";
    if (diff < 60) return diff + " seconds ago";
    if (diff < 120) return "1 minute ago";
    if (diff < 3600) return Math.trunc(diff / 60) + " minutes ago";
    if (diff < 7200) return "1 hour ago";
    if (diff < 86400) return Math.trunc(diff / 3600) + " hours ago";
    if (diff < 172800) return "1 day ago";
    if (diff < 604800) return Math.trunc(diff / 86400) + " days ago";

    let date = new Date(Number(timestamp))
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
   
    date = date.toLocaleDateString("en-US", options);
    
    return date;
}

/* initializeSubmittedCommentsSection creates a section for the comments array, appends it to main, and adds the comments from the comments array */

function initializeSubmittedCommentsSection () {
    const main = document.querySelector('main');

    const submittedCommentsSection = createElement(main, 'section', 'submitted-comments');
 
    createElement(submittedCommentsSection, 'div', 'submitted-comments__divider');
}

/*
 * formHandler provides form validation as well as adding a successfully submitted comment into the comments section
 * @param e (event): the form submit event
 */
function formHandler (e) {
    e.preventDefault();
    
    let hasErrors = false;
    let label = {};

    const form = e.target;
    const name = form.name;
    const comment = form.comment;

    if (!name.value) {
        name.classList.add('add-comment__input-name--error');

        label = document.querySelector('.add-comment__label-name');
        label.classList.add('add-comment__label-name--error');
        label.innerText = 'Please enter a name.'

        hasErrors = true;
    } else {
        name.classList.remove('add-comment__input-name--error');

        label = document.querySelector('.add-comment__label-name');
        label.classList.remove('add-comment__label-name--error');
        label.innerText = 'NAME';
    }

    if (!comment.value) {
        comment.classList.add('add-comment__input-comment--error');

        label = document.querySelector('.add-comment__label-comment');
        label.classList.add('add-comment__label-comment--error');
        label.innerText = 'Please write a comment.'

        hasErrors = true;
    } else {
        comment.classList.remove('add-comment__input-comment--error');

        label = document.querySelector('.add-comment__label-comment');
        label.classList.remove('add-comment__label-comment--error');
        label.innerText = 'COMMENT';
    }

    if (hasErrors) return;

    addComment(name.value, comment.value);

    e.target.reset();
}

function getComments () {
    const request = {
        url: baseUrl + `comments?api_key=${apiKey}`,
        method: 'get'
    }

    axios (request)
    .then (response => {
        const submittedCommentsSection = document.querySelector('.submitted-comments')
        submittedCommentsSection.innerHTML = '';

        const sortedComments = response.data.sort ((a, b) => b.timestamp - a.timestamp);

        for (let i = 0; i < sortedComments.length; ++i) {
            displayComment (submittedCommentsSection, sortedComments[i], i);
        }
    })
    .catch (error => {}) 
}

function addComment (name, comment) {
    const request = {
        url: baseUrl + `comments?api_key=${apiKey}`,
        method: 'post',
        data: {
            name: name,
            comment: comment
        }
    }

    axios (request)
    .then (response => {
        getComments ();
    })
    .catch (error => {}) 
}

function addLike (id) {
    const request = {
        url: baseUrl + `comments/${id}/like?api_key=${apiKey}`,
        method: 'put',
    }

    axios (request)
    .then (response => {
        getComments();
    })
    .catch (error => {})
}

function deleteComment (id) {
    const request = {
        url: baseUrl + `comments/${id}?api_key=${apiKey}`,
        method: 'delete',
    }

    axios (request)
    .then (response => {
        getComments(); 
    })
    .catch (error => {})
}

initializeAddCommentSection();
initializeSubmittedCommentsSection();
getComments();
