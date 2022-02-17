
const apiKey = "f3bd5bed-c466-449a-bc93-1d14dc589719";
const baseUrl = "https://project-1-api.herokuapp.com/";

let comments = [
    {
        id: 0,
        avatar: "",
        name: "Connor Walton",
        timestamp: "02/17/2021",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        id: 1,
        avatar: "",
        name: "Emilie Beach",
        timestamp: "01/09/2021",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        id: 2,
        avatar: "",
        name: "Miles Acosta",
        timestamp: "12/20/2020",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
]

/*
 * initializeAddCommentSection creates the input form and appends it to main
 */
function initializeAddCommentSection () {
    const main = Q('main');

    const section = C(main, 'section', 'add-comment');

    C(section, 'h2', 'add-comment__title', 'Join the Conversation');

    const formContainer = C(section, 'div', 'add-comment__form-container');

    C(formContainer, 'img', 'add-comment__head-shot', '', {src: '/assets/images/Mohan-muruge.jpg', alt: 'avatar'});

    const form = C(formContainer, 'form', 'add-comment__form', '', {id: 'inputForm'});
    
    C(form, 'label', 'add-comment__label-name', 'NAME', {for: 'name'});

    C(form, 'input', 'add-comment__input-name', '', {type: 'text', name: 'name', id: 'name', placeholder: 'Enter your name'});

    C(form, 'label', 'add-comment__label-comment', 'COMMENT', {for: 'comment'});

    C(form, 'textarea', 'add-comment__input-comment', '', {name: 'comment', id: 'comment', placeholder: 'Add a new comment'});

    C(form, 'button', 'add-comment__button', 'COMMENT');

    form.addEventListener('submit', formHandler);
}

/*
 * displayComment creates and returns an individual comment card
 */
function displayComment (comment) {
    let avatar = {};

    let commentCard = document.createElement('div');
    commentCard.classList.add('submitted-comments__comment-card');

    C(commentCard, 'div', 'submitted-comments__divider');

    let displayContainer = C(commentCard, 'div', 'submitted-comments__display-container');

    if (comment.avatar) {
        C(displayContainer, 'img', 'submitted-comments__avatar', '', {src: comment.avatar, alt: 'avatar'});
    } else {
        avatar = C(displayContainer, 'div', 'submitted-comments__avatar');
    }
    
    let commentCardContainer = C(displayContainer, 'div', 'submitted-comments__info');

    let nameTimeContainer = C(commentCardContainer, 'div', 'submitted-comments__name-time-container');
    
    C(nameTimeContainer, 'p', 'submitted-comments__name', comment.name);

    C(nameTimeContainer, 'p', 'submitted-comments__timestamp', displayLiveDate(comment.timestamp));

    C(commentCardContainer, 'p', 'submitted-comments__comment', comment.comment);

    return commentCard;
}

/*
 * updateSubmittedComments clears the provided section and then populates it with the contents the comments array
 * @param submittedCommentsSection (Element): the element of the section that will house the comments
 */
function updateSubmittedComments (submittedCommentsSection) {
    submittedCommentsSection.innerHTML = '';

    for (let i = 0; i < comments.length; i++) {
        submittedCommentsSection.appendChild(displayComment (comments[i]));
    }
}

/*
 * displayLiveUpdate transforms the timestamp into a human readable output
 * @param timestamp (seconds): the number of seconds since epoch. If date is provided then date is converted to seconds since epoch.
 * @return String: formatted output to display the comment time
 */
function displayLiveDate (timestamp) {
    let test;

    if (timestamp.indexOf('/') !== -1) {
        const dateParts = timestamp.split('/');
        const dateString = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
        test = Date.parse(dateString)/1000;
        if (isNaN(test)) return timestamp;
        timestamp = test;
    }

    test = parseInt(timestamp);
    if (isNaN(test)) return timestamp;
    timestamp = test;

    const currentTime = Math.round(Date.now() / 1000);
    const diff = currentTime - timestamp;

    if (diff < 2) return "now";
    if (diff < 60) return diff + " seconds ago";
    if (diff < 120) return "1 minute ago";
    if (diff < 3600) return (diff % 60) + " minutes ago";
    if (diff < 7200) return "1 hour ago";
    if (diff < 86400) return (diff % 3600) + " hours ago";
    if (diff < 172800) return "1 day ago";
    if (diff < 604800) return (diff % 86400) + " days ago";

    const myDate = new Date((timestamp+82000)*1000);
    const localString = myDate.toLocaleString();
    const localParts = localString.split(',');
    
    return localParts[0];
}

/* initializeSubmittedCommentsSection creates a section for the comments array, appends it to main, and adds the comments from the comments array */

function initializeSubmittedCommentsSection () {
    const main = Q('main');

    const submittedCommentsSection = C(main, 'section', 'submitted-comments');

    updateSubmittedComments(submittedCommentsSection);
 
    C(submittedCommentsSection, 'div', 'submitted-comments__divider');
}

/*
 * formHandler provides form validation as well as adding a successfully submitted comment into the comments section
 * @param e (event): the form submit event
 */
function formHandler (e) {
    e.preventDefault();
    
    let hasErrors = false;
    let label = {};

    const name = e.target.name.value;
    const comment = e.target.comment.value;

    if (!name) {
        I('name').classList.add('add-comment__input-name--error');

        label = Q('.add-comment__label-name');
        label.classList.add('add-comment__label-name--error');
        label.innerText = 'Please enter a name.'

        hasErrors = true;
    } else {
         I('name').classList.remove('add-comment__input-name--error');

        label = Q('.add-comment__label-name');
        label.classList.remove('add-comment__label-name--error');
        label.innerText = 'NAME';
    }

    if (!comment) {
        I('comment').classList.add('add-comment__input-comment--error');

        label = Q('.add-comment__label-comment');
        label.classList.add('add-comment__label-comment--error');
        label.innerText = 'Please write a comment.'

        hasErrors = true;
    } else {
        I('comment').classList.remove('add-comment__input-comment--error');

        label = Q('.add-comment__label-comment');
        label.classList.remove('add-comment__label-comment--error');
        label.innerText = 'COMMENT';
    }

    if (hasErrors) return;

    let nextId = -1;

    comments.forEach(comment => {
        if (comment.id >= nextId) nextId = comment.id + 1; 
    });

    const newComment = {
        id: nextId,
        avatar: '',
        name: name,
        timestamp: Math.round(Date.now() / 1000).toString(),
        comment: comment
    }

    comments.unshift(newComment);

    const submittedCommentsSection = Q('.submitted-comments');

    updateSubmittedComments (submittedCommentsSection);

    e.target.reset();
}

function getComments () {
    const request = {
        url: baseUrl + `comments?api_key=${apiKey}`,
        method: 'get'
    }

    axios (request)
    .then (response => {
        console.log ('success', response);
    })
    .catch (error => {
        console.log ('error', error)
    }) 
}

function getShowDates () {
    const request = {
        url: baseUrl + `showdates?api_key=${apiKey}`,
        method: 'get'
    }

    axios (request)
    .then (response => {
        console.log ('success', response);
    })
    .catch (error => {
        console.log ('error', error)
    }) 
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
        console.log ('success', response);
    })
    .catch (error => {
        console.log ('error', error)
    }) 
}

function addLike (id) {
    const request = {
        url: baseURL + `comments/${id}/like`,
        method: 'put',
    }

    axios (request)
    .then (response => {
        console.log ('success', response);
    })
    .catch (error => {
        console.log ('error', error);
    })
}

function deleteComment (id) {
    const request = {
        url: baseURL + `comments/${id}`,
        method: 'delete',
    }

    axios (request)
    .then (response => {
        console.log ('success', response);
    })
    .catch (error => {
        console.log ('error', error);
    })
}
initializeAddCommentSection();
initializeSubmittedCommentsSection();
getComments();
getShowDates();
addComment("Miguel Madera", "Just wow!");