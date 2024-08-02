const users = [
    {name: 'Victor Pinto',
    date:'11/02/2023', 
    comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains",
    image: '',
    note: 'default profile pic',

    },
    {name: 'Christina Cabrera',
    date:'10/28/2023', 
    comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    image: '',
    note: 'default profile pic',
    },
    {name: 'Isaac Tadesse',
    date:'10/20/2023', 
    comment: "I can t stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough",
    image: '',
    note: 'default profile pic',
    },
]

function createCommentCard(user){
    //create parent container and adds class='comment__wrapper'
    const cardEl = document.createElement('article');
    cardEl.classList.add('comment__card')
    //create user name, comment text, date and image
    const imgEl = document.createElement('img')
    imgEl.classList.add('comment__img')
    imgEl.src = users.image ||'';
    imgEl.alt = users.note;
    if (!user.image) {
        imgEl.style.backgroundColor = '#E1E1E1';
    }
    
    const nameEl = document.createElement('h3')
    nameEl.classList.add('comment__name')
    nameEl.innerText = user.name;

    const commentEl = document.createElement('p');
    commentEl.classList.add('comment__text')
    commentEl.innerText = user.comment;

    const dateEl = document.createElement('span');
    dateEl.classList.add('comment__date')
    dateEl.innerText = `Date: ${user.date}`;

    const textWrapperEl = document.createElement('div');
    textWrapperEl.classList.add('comment__text-wrapper');
    textWrapperEl.appendChild(nameEl);
    textWrapperEl.appendChild(commentEl);
    textWrapperEl.appendChild(dateEl);

    const dividerEl = document.createElement('div');
    dividerEl.classList.add('comment__divider');

    // const innerWrapperEl = document.createElement('div');
    // innerWrapperEl.classList.add('comment__text-wrapper--inner');
    // innerWrapperEl.appendChild(nameEl);
    // innerWrapperEl.appendChild(dateEl);

    cardEl.appendChild(imgEl);
    cardEl.appendChild(textWrapperEl);
    cardEl.appendChild(dividerEl);



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
        image:'"./asset/images/Mohan-muruge.jpg',
        note: 'current comment profile pic'
    }


users.push(cardData);
users.sort((a,b) =>new Date(b.date) - new Date(a.date));
console.log(users);
renderUser();
}

const formEl = document.getElementById('user-form');
formEl.addEventListener('submit', handleFormSubmit);

renderUser();
