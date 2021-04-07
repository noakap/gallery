var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';

var gBoard;
var gGamerPos;
var gBallsCounter = 0;
var numOfCurrBallsOnBoard = 0;
var gIdInterval = null;

function initGame() {
	clearInterval(gIdInterval);
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	numOfCurrBallsOnBoard = 2;
	gBallsCounter = 0;
	document.querySelector('h2 span').innerText = gBallsCounter;
	gIdInterval = setInterval(addBallRandomly, 3000);
}


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			board[board.length / 2][0].type = FLOOR;
			board[board.length / 2][board[0].length - 1].type = FLOOR;
			board[0][board[0].length / 2].type = FLOOR;
			board[board.length - 1][board[0].length / 2].type = FLOOR;

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	// console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			//TODO - Change To template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	console.log(targetCell.type);
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	// var iAbsDiff = Math.abs(i - gGamerPos.i);
	// var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	// if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

	if (targetCell.gameElement === BALL) {
		var audioPlay = new Audio('img/pop.wav');
		audioPlay.play();
		gBallsCounter++;
		numOfCurrBallsOnBoard--;
		document.querySelector('h2 span').innerText = gBallsCounter;
		console.log('Collecting!');
		chackIfGameEnd();
	}

	// MOVING from current position
	// Model:
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
	// Dom:
	renderCell(gGamerPos, '');

	// MOVING to selected position
	// Model:
	gGamerPos.i = i;
	gGamerPos.j = j;
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	// DOM:
	renderCell(gGamerPos, GAMER_IMG);

} //else console.log('TOO FAR', iAbsDiff, jAbsDiff);

// }

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			if (!chackIfPassgaes(i, j - 1)) moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			if (!chackIfPassgaes(i, j + 1)) moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			if (!chackIfPassgaes(i - 1, j)) moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			if (!chackIfPassgaes(i + 1, j)) moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function addBallRandomly() {
	var idxI = getRandomNum(gBoard.length - 1, 1);
	var idxJ = getRandomNum(gBoard.length - 1, 1);
	while (!isEmpty(gBoard[idxI][idxJ])) {
		idxI = getRandomNum(gBoard.length - 1, 1);
		idxJ = getRandomNum(gBoard.length - 1, 1);
	}
	gBoard[idxI][idxJ].gameElement = BALL;
	var newPos = {
		i: idxI,
		j: idxJ
	};
	renderCell(newPos, BALL_IMG);
	numOfCurrBallsOnBoard++;
}

function isEmpty(cell) {
	return (cell.gameElement === null)
}

function chackIfGameEnd() {
	if (numOfCurrBallsOnBoard === 0) {
		console.log('Game Over!');
		clearInterval(gIdInterval);
	}
}

function chackIfPassgaes(i, j) {
	if (i === gBoard.length / 2 && j === 0) {
		console.log('h1')
		moveTo(gBoard.length / 2, gBoard[0].length - 1);
		return true;
	}
	else if (i === gBoard.length / 2 && j === gBoard[0].length - 1) {
		console.log('h2')
		moveTo(gBoard.length / 2, 0);
		return true;
	}
	else if (i === 0 && j === gBoard[0].length / 2) {
		console.log('h3')
		moveTo(gBoard.length - 1, gBoard[0].length / 2);
		return true;
	}
	else if (i === gBoard.length - 1 && j === gBoard[0].length / 2) {
		console.log('h4')
		moveTo(0, gBoard[0].length / 2);
		return true;
	}
	else return false;
}

