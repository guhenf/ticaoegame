const cells = document.querySelectorAll('.cell')
const board = document.querySelector('.board')
const containerMessage = document.querySelector('.containerMessage')
const roundMessage = document.querySelector('.roundMessage')
const roundRestart = document.querySelector('.roundRestart')
const winningsCountP1 = document.querySelector('.winningsCountP1')
const winningsCountP2 = document.querySelector('.winningsCountP2')
const restartScoreboard = document.querySelector('.restartScoreboard')

let currentTurn

let winsP1 = 0
let winsP2 = 0

const winnerCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[0, 4, 8],
]

const start = () => {
	currentTurn = false

	for (const cell of cells) {
		cell.classList.remove('o')
		cell.classList.remove('x')
		cell.removeEventListener('click', handleClick)
		cell.addEventListener('click', handleClick, { once: true })
	}

	setFirstPlayer()
	containerMessage.classList.remove('display')
}

const winnerCondition = (currentPlay) => {
	return winnerCombinations.some((combination) => {
		return combination.every((index) => {
			return cells[index].classList.contains(currentPlay)
		})
	})
}

const drawCondition = () => {
	return [...cells].every((cell) => {
		return cell.classList.contains('x') || cell.classList.contains('o')
	})
}

const endGame = (draw) => {
	if (draw) {
		roundMessage.innerHTML = 'Draw!'
	} else {
		roundMessage.innerHTML = currentTurn ? 'O Win!' : 'X Win!'
		if (!currentTurn) {
			console.log(currentTurn, winsP1)
			winsP1++
			winningsCountP1.innerHTML = winsP1
		} else {
			console.log(currentTurn, winsP2)
			winsP2++
			winningsCountP2.innerHTML = winsP2
		}
	}
	containerMessage.classList.add('display')
}

roundRestart.addEventListener('click', start)

const setFirstPlayer = () => {
	board.classList.remove('x')
	board.classList.remove('o')

	if (currentTurn) {
		board.classList.add('o')
	} else {
		board.classList.add('x')
	}
}

const changePlayer = () => {
	currentTurn = !currentTurn
	setFirstPlayer()
}

const cellMark = (cell, playToAdd) => {
	cell.classList.add(playToAdd)
}

const handleClick = (e) => {
	const cell = e.target
	const playToAdd = currentTurn ? 'o' : 'x'

	cellMark(cell, playToAdd)

	const win = winnerCondition(playToAdd)
	const draw = drawCondition()

	if (win) {
		endGame(false)
	} else if (draw) {
		endGame(true)
	} else {
		changePlayer()
	}
}

const winnerCounter = () => {
	winsP1 = 0
	winningsCountP1.innerHTML = winsP1

	winsP2 = 0
	winningsCountP2.innerHTML = winsP2
}

restartScoreboard.addEventListener('click', winnerCounter)

start()
