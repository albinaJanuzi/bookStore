function init() {
    loadBooksFromLocalStorage();
    renderBooks();
}


function renderBooks() {
    let contentBooksRef = document.getElementById('content');
    contentBooksRef.innerHTML = "";

    for (let indexBook = 0; indexBook < books.length; indexBook++) {
        contentBooksRef.innerHTML += getBooksTemplate(indexBook);
    }
}


function getBooksTemplate(indexBook) {
    const book = books[indexBook];

    let commentsHTML = '';
    for (let i = 0; i < book.comments.length; i++) {
        const comment = book.comments[i];
        commentsHTML += `<li><strong>${comment.name}:</strong> ${comment.comment}</li>`;
    }

    return `
        <div class="book">
            <div class="img-title-like">
                <img class="book-img" src="${book.imageUrl}" alt="Book Photo">
            <div class="title-like">
                <h2>${book.name}</h2>
                <div>
                <button class="like-btn" onclick="likeBook(${indexBook})">
                    <img class="dislike-img" id="likeDisabled-${indexBook}" src="./img/like-disabled.jpg" alt="Like Disabled" style="display: ${book.liked ? 'none' : 'block'}">
                    <img class="like-img" id="likeEnabled-${indexBook}" src="./img/like-enabled.jpg" alt="Like Enabled" style="display: ${book.liked ? 'block' : 'none'}">
                </button>
                </div>
            </div>
            </div>
            <p><strong>Author:</strong> ${book.author}</p>
            <p id="likesCount-${indexBook}"><strong>Likes:</strong> ${book.likes}</p>
            <p id="likedText-${indexBook}"><strong>Liked:</strong> ${book.liked ? "Yes" : "No"}</p>
            <p><strong>Price:</strong> $${book.price}</p>
            <p><strong>Published Year:</strong> ${book.publishedYear}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <h3>Comments:</h3>
            <ul id="commentsList-${indexBook}">
                ${commentsHTML}
            </ul>
            <div class="input-content">
            <input id="commentInput-${indexBook}" type="text" placeholder="Comment...">
             <button  onclick="addComment(${indexBook})"><img class="send-btn" src="./img/send.png" alt="Icon"></button>
             </div>
        </div>
    `;
}


function addComment(indexBook) {
    const commentInputRef = document.getElementById(`commentInput-${indexBook}`);
    const commentText = commentInputRef.value.trim();

    if (commentText) {
        const book = books[indexBook];
        const newComment = {
            name: "Albina",
            comment: commentText,
        };

        book.comments.push(newComment);
        commentInputRef.value = "";

        saveBooksToLocalStorage();
          renderComments(indexBook);
    }
}

function renderComments(indexBook) {
    const book = books[indexBook];
    const commentsListRef = document.getElementById(`commentsList-${indexBook}`);

    let commentsHTML = '';
    for (let i = 0; i < book.comments.length; i++) {
        const comment = book.comments[i];
        commentsHTML += `<li><strong>${comment.name}:</strong> ${comment.comment}</li>`;
    }

    commentsListRef.innerHTML = commentsHTML;
}


function likeBook(indexBook) {
    let book = books[indexBook];
    let likeDisabledRef = document.getElementById(`likeDisabled-${indexBook}`);
    let likeEnabledRef = document.getElementById(`likeEnabled-${indexBook}`);
    let likesCountRef = document.getElementById(`likesCount-${indexBook}`);
    let likedTextRef = document.getElementById(`likedText-${indexBook}`);

    book.liked = !book.liked;
    book.likes += book.liked ? 1 : -1;

    if (book.liked) {
        likeDisabledRef.style.display = "none";
        likeEnabledRef.style.display = "block";
    } else {
        likeDisabledRef.style.display = "block";
        likeEnabledRef.style.display = "none";
    }

    likesCountRef.innerHTML = `<strong>Likes:</strong> ${book.likes}`;
    likedTextRef.innerHTML = `<strong>Liked:</strong> ${book.liked ? "Yes" : "No"}`;

    saveBooksToLocalStorage();
}


function loadBooksFromLocalStorage() {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
        books = JSON.parse(savedBooks);
    }
}


function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

