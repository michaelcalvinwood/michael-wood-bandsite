

function initializeAddCommentSection () {
    const section = document.createElement('section');
    section.classList.add('add-comment');
    const main = document.querySelector('main');
    main.appendChild(section);

    const title = document.createElement('h2');
    title.classList.add('add-comment__title');
    title.innerText = 'Join the Conversation';
    section.appendChild(title);

    const formContainer = document.createElement('div');
    formContainer.classList.add('add-comment__form-container');
    section.appendChild(formContainer);

    const form = document.createElement('form');
    form.classList.add('add-comment__form');
    section.appendChild(form);

    const labelName = document.createElement('label');
    labelName.classList.add('add-comment__label-name');
    labelName.setAttribute('for', 'name');
    labelName.innerText = 'NAME';
    form.appendChild(labelName);

    const headShot = document.createElement('img');
    headShot.classList.add('add-comment__head-shot');
    headShot.setAttribute('src', '/assets/images/Mohan-muruge.jpg');
    form.appendChild(headShot);

    const inputName = document.createElement('input');
    inputName.classList.add('add-comment__input-name');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('name', 'name');
    inputName.setAttribute('id', 'name');
    inputName.setAttribute('placeholder', 'Enter your name');
    form.appendChild(inputName);

    const labelComment = document.createElement('label');
    labelComment.classList.add('add-comment__label-comment');
    labelComment.setAttribute('for', 'name');
    labelComment.innerText = 'COMMENT';
    form.appendChild(labelComment);

    const inputComment = document.createElement('textarea');
    inputComment.classList.add('add-comment__input-comment');
    inputComment.setAttribute('name', 'comment');
    inputComment.setAttribute('id', 'comment');
    inputComment.setAttribute('placeholder', 'Add a new comment');
    form.appendChild(inputComment);

    const commentsButton = document.createElement('button');
    commentsButton.classList.add('add-comment__button');
    commentsButton.innerText = "COMMENT";
    form.appendChild(commentsButton);    
}

function initializeSubmittedCommentsSection () {
    const main = document.querySelector('main');

    const section = document.createElement('section');
    section.classList('submitted-comments')
    main.appendChild(section);
}

initializeAddCommentSection();



