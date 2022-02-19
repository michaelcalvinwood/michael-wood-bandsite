const apiKey = "f3bd5bed-c466-449a-bc93-1d14dc589719";
const baseUrl = "https://project-1-api.herokuapp.com/";

XMLDocument


/*
 * initializeAddCommentSection creates the input form and appends it to main
 */
function initializeAddCommentSection () {
//     const main = document.querySelector('main');

//     const section = createElementmain, 'section', 'add-comment');

//     createElement(section, 'h2', 'add-comment__title', 'Join the Conversation');

//     const formContainer = createElement(section, 'div', 'add-comment__form-container');

//     createElement(formContainer, 'img', 'add-comment__head-shot', '', {src: '/assets/images/Mohan-muruge.jpg', alt: 'avatar'});

//     const form = createElement(formContainer, 'form', 'add-comment__form', '', {id: 'inputForm'});
    
//     createElement(form, 'label', 'add-comment__label-name', 'NAME', {for: 'name'});

//     createElement(form, 'input', 'add-comment__input-name', '', {type: 'text', name: 'name', id: 'name', placeholder: 'Enter your name'});

//     createElement(form, 'label', 'add-comment__label-comment', 'COMMENT', {for: 'comment'});

//     createElement(form, 'textarea', 'add-comment__input-comment', '', {name: 'comment', id: 'comment', placeholder: 'Add a new comment'});

//     createElement(form, 'button', 'add-comment__button', 'COMMENT');

    document.querySelector('form').addEventListener('submit', formHandler);
}

/*
 * displayComment creates and returns an individual comment card
 */
function displayComment (comment) {
    let avatar = {};

    let commentCard = document.createElement('div');
    commentCard.classList.add('submitted-comments__comment-card');

    createElement(commentCard, 'div', 'submitted-comments__divider');

    let displayContainer = createElement(commentCard, 'div', 'submitted-comments__display-container');

    if (comment.avatar) {
        createElement(displayContainer, 'img', 'submitted-comments__avatar', '', {src: comment.avatar, alt: 'avatar'});
    } else {
        avatar = createElement(displayContainer, 'div', 'submitted-comments__avatar');
    }
    
    let commentCardContainer = createElement(displayContainer, 'div', 'submitted-comments__info');

    let nameTimeContainer = createElement(commentCardContainer, 'div', 'submitted-comments__name-time-container');
    
    createElement(nameTimeContainer, 'p', 'submitted-comments__name', comment.name);

    createElement(nameTimeContainer, 'p', 'submitted-comments__timestamp', displayLiveDate(comment.timestamp));

    createElement(commentCardContainer, 'p', 'submitted-comments__comment', comment.comment);

    console.log ('commentCard', commentCard);

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
    timestamp = Number(timestamp);

    const currentTime = Date.now();
    let diff = (currentTime - timestamp) / 1000;
    diff = Math.trunc(diff);

    if (diff < 2) return "now";
    if (diff < 60) return diff + " seconds ago";
    if (diff < 120) return "1 minute ago";
    if (diff < 3600) return (diff % 60) + " minutes ago";
    if (diff < 7200) return "1 hour ago";
    if (diff < 86400) return (diff % 3600) + " hours ago";
    if (diff < 172800) return "1 day ago";
    if (diff < 604800) return (diff % 86400) + " days ago";

    let date = new Date(Number(timestamp))
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    
    // console.log(today.toLocaleDateString("en-US")); // 9/17/2016
    // console.log(today.toLocaleDateString("en-US", options));

    date = date.toLocaleDateString("en-US", options);
    
    return date;
}

/* initializeSubmittedCommentsSection creates a section for the comments array, appends it to main, and adds the comments from the comments array */

function initializeSubmittedCommentsSection () {
    const main = document.querySelector('main');

    const submittedCommentsSection = createElement(main, 'section', 'submitted-comments');

    // updateSubmittedComments(submittedCommentsSection);
 
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

    const name = e.target.name.value;
    const comment = e.target.comment.value;

    if (!name) {
        I('name').classList.add('add-comment__input-name--error');

        label = document.querySelector('.add-comment__label-name');
        label.classList.add('add-comment__label-name--error');
        label.innerText = 'Please enter a name.'

        hasErrors = true;
    } else {
         I('name').classList.remove('add-comment__input-name--error');

        label = document.querySelector('.add-comment__label-name');
        label.classList.remove('add-comment__label-name--error');
        label.innerText = 'NAME';
    }

    if (!comment) {
        I('comment').classList.add('add-comment__input-comment--error');

        label = document.querySelector('.add-comment__label-comment');
        label.classList.add('add-comment__label-comment--error');
        label.innerText = 'Please write a comment.'

        hasErrors = true;
    } else {
        I('comment').classList.remove('add-comment__input-comment--error');

        label = document.querySelector('.add-comment__label-comment');
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

    const submittedCommentsSection = document.querySelector('.submitted-comments');

    // updateSubmittedComments (submittedCommentsSection);

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

        for (let i = 0; i < response.data.length; ++i) {
            submittedCommentsSection.appendChild(displayComment (response.data[i]));
        }
        console.log ('success', response.data);
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
// getShowDates();
// addComment("Miguel Madera", "Just wow!");