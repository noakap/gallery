'use strict';

var gProjs = [{
        id: makeId(),
        name: 'MinesSweeper',
        title: 'Mines Sweeper',
        desc: 'This is a mines sweaper game',
        imgUrl: 'minesSweeper',
        url: '/myProjects/FINAL  DELIVERY - Thursday 2030/index.html',
        publishedAt: Date.now(),
        labels: ['Matrixes', 'keyboard events'],
    },
    {
        id: makeId(),
        name: 'chess',
        title: 'chess',
        desc: 'chess game',
        imgUrl: 'chess',
        url: '/myProjects/chess-start-here/index.html',
        publishedAt: Date.now(),
        labels: ['Matrixes', 'keyboard events'],
    },
    {
        id: makeId(),
        name: 'Ball-Board',
        title: 'Ball-Board',
        desc: 'This is the ball game.',
        imgUrl: 'ball-Board',
        url: 'myProjects/ball-board-start-here/index.html',
        publishedAt: Date.now(),
        labels: ['Matrixes', 'keyboard events'],
    },
    {
        id: makeId(),
        name: 'bookshop',
        title: 'bookshop',
        desc: 'This is the bookshop ',
        imgUrl: 'bookshop',
        url: 'myProjects/ex-book-shop/index.html',
        publishedAt: Date.now(),
        labels: ['Matrixes', 'keyboard events'],
    }
];

function getProjById(id) {
    return gProjs.find(function(project) {
        return project.id === id;
    })
}

function getProjects() {
    return gProjs;
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}