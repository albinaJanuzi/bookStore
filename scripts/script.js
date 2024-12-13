function init() {
    renderBooks();
  }
  
  function renderBooks(){
    let contentBooksRef = document.getElementById('content');
    contentBooksRef.innerHTML = "";
  
    for (let indexBook= 0; indexBook < books.length; indexBook++) {
      contentBooksRef.innerHTML += getBooksTemplate(indexBook);
      
      
    }
  }
  
  function getBooksTemplate(indexBook){
    const book = books[indexBook];
  
    return `
    <div class="book">
      <h2>${book.name}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Likes:</strong> ${book.likes}</p>
      <p><strong>Liked:</strong> ${book.liked ? "Yes" : "No"}</p>
      <p><strong>Price:</strong> $${book.price}</p>
      <p><strong>Published Year:</strong> ${book.publishedYear}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <h3>Comments:</h3>
      <ul>
        ${book.comments.map(comment => `<li><strong>${comment.name}:</strong> ${comment.comment}</li>`).join('')}
      </ul>
      
    </div>
  `;
  }