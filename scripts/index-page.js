import BandSiteApi from "../scripts/band-site-api.js";

let thing = new BandSiteApi();

const cardEl = document.getElementById('mycomment');

let users =[];

async function fetchAndRenderComments(){
    const comments = await thing.getComments();
    console.log(comments);

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

    const nameEl = document.createElement('h3');
    nameEl.classList.add('comment__name');
    nameEl.innerText = user.name;

    const commentEl = document.createElement('p');
    commentEl.classList.add('comment__text');
    commentEl.innerText = user.Comment;

    const dateEl = document.createElement('span');
    dateEl.classList.add('comment__date');
    dateEl.innerText = user.date;

    
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


function handleFormSubmit(e){
    e.preventDefault();
    console.log(e.target.userName.value);
    console.log(e.target.userComment.value);

    const cardData = {
        name: e.target.userName.value,
        date: new Date().toLocaleDateString('en-US'),
        comment: e.target.userComment.value,
    }


    users.push(cardData);
    users.sort((a,b) =>new Date(b.date) - new Date(a.date));
    console.log(users);
    renderUser();

    e.target.userName.value = '';
    e.target.userComment.value = '';
}

const formEl = document.getElementById('user-form');
formEl.addEventListener('submit', handleFormSubmit);

renderUser();
