const cells = document.querySelectorAll('.cell')
const board = document.querySelector('.board')

let currentTurn

const start = () => {
	for (const cell of cells) {
		cell.addEventListener('click', handleClick, { once: true })
	}

	currentTurn = false

	board.classList.add('x')
}

const changePlayer = () => {
	currentTurn = !currentTurn

	board.classList.remove('x')
	board.classList.remove('o')

	if (currentTurn) {
		board.classList.add('o')
	} else {
		board.classList.add('x')
	}
}

const cellMark = (cell, playToAdd) => {
	cell.classList.add(playToAdd)
}

const handleClick = (e) => {
	const cell = e.target
	const playToAdd = currentTurn ? 'o' : 'x'

	cellMark(cell, playToAdd)
	changePlayer()
}

start()
