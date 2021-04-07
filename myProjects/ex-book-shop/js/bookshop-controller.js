`use strict`

function onInit() {
    var books = createBooks();
    renderBooks(books);
}

function renderBooks() {
    var books = getBooks()
    strHtml = `<table id="table">
    <tr>
        <td></td>
        <td>Id</td>
        <td>Title</td>
        <td>Price</td>
        <td>Action</td>
    </tr>`;

    books.forEach(function(book) {
        var img = (book.imgNum === 'not-found') ? 'not-found' : `book${book.imgNum}`;
        strHtml += ` <tr><td><img src="img/${img}.webp"></td>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.price}.00$</td>
                <td><button onclick="showsDetails('${book.id}')">Read</button>
                <button onclick="onUpDateBook('${book.id}')">Update</button>
                <button onclick="onRemoveBook('${book.id}')">Delete</button>
                
                </td>
                </tr>`;
    })
    strHtml += `</table>`;
    document.querySelector('.books-container').innerHTML = strHtml;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function toggleAddBookInputs() {
    var elInputs = document.querySelector('.add-book-inputs');
    elInputs.hidden = !elInputs.hidden;
}

function onAddBook() {
    var bookName = document.getElementById('title').value;
    if (!bookName) return;
    var bookPrice = document.getElementById('price').value;
    if (!bookName) return;
    addBook(bookPrice, bookName);
    toggleAddBookInputs();
    renderBooks();
}

function onUpDateBook(bookId) {
    var price = prompt('What is the price of the book?');
    upDateBook(bookId, price);
    renderBooks();
}

function showsDetails(bookId) {
    var book = getBook(bookId);
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.title;
    elModal.querySelector('h6').innerText = `price: ${book.price}.00$`;
    elModal.querySelector('p').innerText = book.description;

    var img = (book.imgNum === 'not-found') ? 'not-found' : `book${book.imgNum}`;
    elModal.querySelector('.img-container').innerHTML = `<img src="img/${img}.webp">`
    elModal.querySelector('.img-container').innerHTML = `<img src="img/${img}.webp">`

    renderRatingStars(book);
    renderPlusMinusBtn(book);

    elModal.hidden = false;
}

function renderRatingStars(book) {
    var strHtml = `<div class="clip-star"></div>`;
    document.querySelector('.rating-container').innerHTML = strHtml.repeat(book.rate);
}

function renderPlusMinusBtn(book) {
    var strHtml = `<button class="btn-minus" onclick="increment('${book.id}')">+</button>
                    <input id=rating-input type=number min=1 max=5 placeholder="0">
                    <button class="btn-minus" onclick="decrement('${book.id}')">-</button>`
    document.querySelector('.btn-container').innerHTML = strHtml;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function increment(bookId) {
    var input = document.getElementById('rating-input')
    input.stepUp();
    upDateBookRating(bookId, input.value);
    renderRatingStars(getBook(bookId));
}

function decrement(bookId) {
    var input = document.getElementById('rating-input')
    input.stepDown();
    upDateBookRating(bookId, input.value);
    renderRatingStars(getBook(bookId));
}