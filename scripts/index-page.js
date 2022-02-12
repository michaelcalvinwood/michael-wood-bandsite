let comments = [
    {
        id: 0,
        avatar: "/assets/images/blank-avatar.jpg",
        name: "Connor Walton",
        timestamp: "02/17/2021",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        id: 1,
        avatar: "/assets/images/blank-avatar.jpg",
        name: "Emilie Beach",
        timestamp: "01/09/2021",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        id: 2,
        avatar: "/assets/images/blank-avatar.jpg",
        name: "Miles Acosta",
        timestamp: "12/20/2020",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
]
    
function initializeAddCommentSection () {
    const main = Q('main');

    const section = C(main, 'section', 'add-comment');

    C(section, 'h2', 'add-comment__title', 'Join the Conversation');

    const formContainer = C(section, 'div', 'add-comment__form-container');

    C(formContainer, 'img', 'add-comment__head-shot', '', {src: '/assets/images/Mohan-muruge.jpg', alt: 'avatar'});

    const form = C(formContainer, 'form', 'add-comment__form', '', {id: 'inputForm'});
    
    C(form, 'label', 'add-comment__label-name', 'NAME', {for: 'name'});

    C(form, 'input', 'add-comment__input-name', '', {type: 'text', name: 'name', id: 'name', placeholder: ' Enter your name'});

    C(form, 'label', 'add-comment__label-comment', 'COMMENT', {for: 'comment'});

    C(form, 'textarea', 'add-comment__input-comment', '', {name: 'comment', id: 'comment', placeholder: ' Add a new comment'});

    C(form, 'button', 'add-comment__button', 'COMMENT');    
}

function initializeSubmittedCommentsSection () {
    const main = Q('main');

    const submittedCommentsSection = C(main, 'section', 'submitted-comments');

    for (let i = 0; i < comments.length; i++) {
        let commentCard = C(submittedCommentsSection, 'div', 'submitted-comments__comment-card');

        C(commentCard, 'div', 'submitted-comments__divider');

        let displayContainer = C(commentCard, 'div', 'submitted-comments__display-container');

        C(displayContainer, 'img', 'submitted-comments__avatar', '', {src: comments[i].avatar, alt: 'avatar'});

        let commentCardContainer = C(displayContainer, 'div', 'submitted-comments__info');

        let nameTimeContainer = C(commentCardContainer, 'div', 'submitted-comments__name-time-container');
        
        C(nameTimeContainer, 'p', 'submitted-comments__name', comments[i].name);

        C(nameTimeContainer, 'p', 'submitted-comments__timestamp', comments[i].timestamp);

        C(commentCardContainer, 'p', 'submitted-comments__comment', comments[i].comment);
    }
 

}

initializeAddCommentSection();
initializeSubmittedCommentsSection();

