`use strict`
var gBooks = [];
const KEY = 'books';
const PAGE_SIZE = 5;

function createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [];
        booksNames = ['LOVE IS A REVOLUTION', 'NEVER LOOK BACK',
            'THE GRAVITY OF US', 'WATCH US RISE'
        ]
        for (var i = 0; i < 4; i++) {
            var price = getRandomIntInclusive(0, 20)
            books.push(_createBook(booksNames[i], price, i + 1, ));
        }
    }
    gBooks = books;
    _saveBooksToStorage();
    return gBooks;
}

function _createBook(title, price, imgNum = 'not-found') {
    return {
        id: makeId(),
        title: title,
        price: price,
        imgNum: imgNum,
        description: makeLorem(50),
        rate: getRandomIntInclusive(1, 5)
    }
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function removeBook(bookId) {
    var foundIdx = gBooks.findIndex(function(book) {
        return book.id === bookId;
    });
    if (foundIdx >= 0) {
        gBooks.splice(foundIdx, 1);
    }
    _upDateStorage();
}

function getBooks() {
    return gBooks;
}

function addBook(price, title) {
    gBooks.push(_createBook(title, price));
    _upDateStorage();
}

function upDateBook(bookId, price) {
    var foundIdx = gBooks.findIndex(function(book) {
        return book.id === bookId;
    });
    if (foundIdx >= 0) {
        gBooks[foundIdx].price = price;
    }
    _upDateStorage();
}

function _upDateStorage() {
    clearStorage();
    _saveBooksToStorage();
}

function getBook(bookId) {
    return gBooks.find(function(book) {
        return book.id === bookId;
    });
}

function upDateBookRating(bookId, rateValue) {
    gBooks.find(function(book) {
        return book.id === bookId;
    }).rate = rateValue;
    _upDateStorage();
}