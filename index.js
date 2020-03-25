let board = [];
for (let i = 0; i < 6; i++) {
    board[i] = new Array(7)
}
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
        board[i][j] = [{ class: "a", pos: `${i}${j}` }]
    }
}
const pOne = 'one'
const pTwo = 'two'
const nextC = 'next'
const filledC = 'filled'
const fullC = 'full'
const lastC = 'last'
let gameOn
let turn
let currentP
const columns = document.querySelectorAll('.column')
const pseudoCells = document.querySelectorAll('.pseudo')
const gameCells = document.querySelectorAll('.game')
const restartButton = document.getElementById('restartButton')

restartButton.addEventListener('click', start)

start()

function start() {
    let i = 0
    let j = 0
    gameCells.forEach(cell => {
        cell.classList.remove(pOne)
        cell.classList.remove(pTwo)
        cell.classList.remove(nextC)
        cell.classList.remove(filledC)
        cell.id = `${i}${j}`
        i++
        if (i == 6) {
            i = 0
            j++
        }
    })
    //gameOn = true
    turn = true
    currentP = turn ? pOne : pTwo
    columns.forEach(column => {
        column.querySelector('.pseudo').classList.remove(pOne)
        column.querySelector('.pseudo').classList.remove(pTwo)
        column.querySelector('.pseudo').classList.add(currentP)

        let temp = column.querySelectorAll('.game')
        temp[temp.length - 1].classList.add(nextC)

        column.removeEventListener('click', nextTurn)
        column.addEventListener('click', nextTurn)
    })
}

function nextTurn(e) {
    // Selecionar a coluna
    const cell = e.target
    const column = cell.parentElement
    // Checar de quem é a vez
    currentP = turn ? pOne : pTwo
    // Realizar o movimento(se a coluna não estiver cheia)
    if (!column.classList.contains(fullC)) {
        placePiece(column, currentP)
        turn = !turn
    }
    // Checar se alguém ganhou
    if (checkWin(currentP)) {
        console.log(currentP + " wins !")
    }
    // Checar se houve um empate
    // Tela de Vitória
    // ou continua o jogo
    currentP = turn ? pOne : pTwo
    columns.forEach(column => {
        column.querySelector('.pseudo').classList.remove(pOne)
        column.querySelector('.pseudo').classList.remove(pTwo)
        column.querySelector('.pseudo').classList.add(currentP)
    })
}

function placePiece(column, currentP) {
    let nextCell = column.querySelector('.next')
    const id = nextCell.id
    const i = Math.floor(id / 10)
    const j = id % 10
    board[i][j].class = currentP
    if (document.querySelector('.last')) {
        document.querySelector('.last').classList.remove(lastC)
    }
    nextCell.classList.add(lastC)
    nextCell.classList.add(currentP)
    nextCell.classList.add(filledC)
    nextCell.classList.remove(nextC)
    let temp = column.querySelectorAll('.game:not(.filled)')
    if (temp.length > 0) {
        temp[temp.length - 1].classList.add(nextC)
    } else {
        column.classList.add(fullC)
    }
}

function checkWin(currentP) {
    const lastCell = document.querySelector('.last')
    const id = lastCell.id
    const i = Math.floor(id / 10)
    const j = id % 10
    if (
        ((i + 3) < 6) &&
        board[i][j].class == currentP &&
        board[i + 1][j].class == currentP &&
        board[i + 2][j].class == currentP &&
        board[i + 3][j].class == currentP
    ) {
        return true
    }
}

/*
if (
        board[i][j].class == currentP &&
        board[i][j + 1].class == currentP &&
        board[i][j + 2].class == currentP &&
        board[i][j + 3].class == currentP
    ) {
        return true
    }
*/