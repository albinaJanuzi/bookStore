function init() {
    loadBooksFromLocalStorage(); // Load books from localStorage when the page is loaded
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
            <h2>${book.name}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p id="likesCount-${indexBook}"><strong>Likes:</strong> ${book.likes}</p>
            <p id="likedText-${indexBook}"><strong>Liked:</strong> ${book.liked ? "Yes" : "No"}</p>
            <p><strong>Price:</strong> $${book.price}</p>
            <p><strong>Published Year:</strong> ${book.publishedYear}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <h3>Comments:</h3>
            <ul>
                ${commentsHTML}
            </ul>
            <input id="commentInput-${indexBook}" type="text" placeholder="Comment...">
            <button onclick="addComment(${indexBook})">Add Comment</button>
            <button class="like-btn" onclick="likeBook(${indexBook})">
                <img class="dislike-img" id="likeDisabled-${indexBook}" src="./img/like-disabled.jpg" alt="Like Disabled" style="display: ${book.liked ? 'none' : 'block'}">
                <img class="like-img" id="likeEnabled-${indexBook}" src="./img/like-enabled.jpg" alt="Like Enabled" style="display: ${book.liked ? 'block' : 'none'}">
            </button>
        </div>
    `;
}

function addComment(indexBook) {
    const commentInputRef = document.getElementById(`commentInput-${indexBook}`);
    const commentText = commentInputRef.value.trim();

    if (commentText) {
        const book = books[indexBook];
        const newComment = {
            name: "Albina",  // Can be replaced with dynamic user name
            comment: commentText,
        };

        book.comments.push(newComment);
        commentInputRef.value = ""; // Clear the input

        // Save books to localStorage after updating
        saveBooksToLocalStorage();

        renderBooks();  // Re-render the books
    }
}

function likeBook(indexBook) {
    let book = books[indexBook];
    let likeDisabledRef = document.getElementById(`likeDisabled-${indexBook}`);
    let likeEnabledRef = document.getElementById(`likeEnabled-${indexBook}`);
    let likesCountRef = document.getElementById(`likesCount-${indexBook}`);
    let likedTextRef = document.getElementById(`likedText-${indexBook}`);

    // Toggle the liked state of the book
    book.liked = !book.liked;
    book.likes += book.liked ? 1 : -1;

    // Update button states
    if (book.liked) {
        likeDisabledRef.style.display = "none";
        likeEnabledRef.style.display = "block";
    } else {
        likeDisabledRef.style.display = "block";
        likeEnabledRef.style.display = "none";
    }

    // Update the like count
    likesCountRef.innerHTML = `<strong>Likes:</strong> ${book.likes}`;

    // Update the liked text
    likedTextRef.innerHTML = `<strong>Liked:</strong> ${book.liked ? "Yes" : "No"}`;

    // Save the updated book data to localStorage
    saveBooksToLocalStorage();
}

// Function to load books data from localStorage
function loadBooksFromLocalStorage() {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
        // Only overwrite the existing books if localStorage data is available
        books = JSON.parse(savedBooks);
    }
}

// Function to save books data to localStorage
function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

