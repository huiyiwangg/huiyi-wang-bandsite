import BandSiteApi from "../scripts/band-site-api.js";

let bandSiteApi = new BandSiteApi();

const cardEl = document.getElementById('mycomment');

let users =[];

async function fetchAndRenderComments(){
    const comments = await bandSiteApi.getComments();
    comments.sort((a,b) =>new Date(b.date) - new Date(a.date));
    users = comments;

    function render() {
        cardEl.innerText = '';
        comments.forEach((comment)=>{
            const commentCard = createCommentCard(comment);
            cardEl.appendChild(commentCard);
        });
    } 
    
    render();    
}

fetchAndRenderComments()


function createCommentCard(user){
    const cardEl = document.createElement('article');
    cardEl.classList.add('comment__card');

    const imgEl = document.createElement('div');
    imgEl.classList.add('comment__card-image');

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('comment__right-container');

    const textWrapperEl = document.createElement('div');
    textWrapperEl.classList.add('comment__text-wrapper');

    const nameEl = document.createElement('div');
    nameEl.classList.add('comment__name');
    nameEl.innerText = user.name;

    const commentEl = document.createElement('p');
    commentEl.classList.add('comment__text');
    commentEl.innerText = user.Comment;

    const dateEl = document.createElement('span');
    dateEl.classList.add('comment__date');
    dateEl.innerText = new Date(user.date).toLocaleString().split(',')[0];

    
    textWrapperEl.appendChild(nameEl);
    textWrapperEl.appendChild(dateEl);

    rightContainer.appendChild(textWrapperEl);
    rightContainer.appendChild(commentEl);

    cardEl.appendChild(imgEl);
    cardEl.appendChild(rightContainer);

    return cardEl;
}

function renderUser(){
    const myUsersEl = document.querySelector('#mycomment');
    myUsersEl.innerHTML = "";

    users.forEach((user) =>{
        const card = createCommentCard(user);
        myUsersEl.appendChild(card);
    });
}


async function handleFormSubmit(e){
    e.preventDefault();

    const userNameInput = e.target.userName;
    const userCommentInput = e.target.userComment;

    userNameInput.classList.remove('comment__area--invalid');
    userCommentInput.classList.remove('comment__area--invalid');

    if (!userNameInput.checkValidity()) {
        userNameInput.classList.add('comment__area--invalid');
    }
    
    if (!userCommentInput.checkValidity()) {
        userCommentInput.classList.add('comment__area--invalid');
    }

    if (!userNameInput.checkValidity() || !userCommentInput.checkValidity()) {
        return;
    }

    await bandSiteApi.postComment(userNameInput.value,userCommentInput.value);

    const cardData = {
        name: e.target.userName.value,
        date: new Date().toLocaleDateString('en-US'),
        Comment: e.target.userComment.value,
    }


    users.unshift(cardData);
    renderUser();

    userNameInput.value = '';
    userCommentInput.value = '';
}

const formEl = document.getElementById('user-form');
formEl.addEventListener('submit', handleFormSubmit);