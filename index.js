let board = []
for (let i = 0; i < 6; i++) {
    board[i] = new Array(7)
}
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
        board[i][j] = [{ class: "null", pos: `${i}${j}` }]
    }
}
const pOne = 'one'
const pTwo = 'two'
const nextC = 'next'
const filledC = 'filled'
const fullC = 'full'
const lastC = 'last'
let moves
let turn
let currentP
const columns = document.querySelectorAll('.column')
const pseudoCells = document.querySelectorAll('.pseudo')
const gameCells = document.querySelectorAll('.game')
const winningScreen = document.getElementById('winningScreen')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')

restartButton.addEventListener('click', start)

start()

function start() {
    winningScreen.classList.remove("show")
    let i = 0
    let j = 0
    gameCells.forEach(cell => {
        cell.classList.remove(pOne)
        cell.classList.remove(pTwo)
        cell.classList.remove(nextC)
        cell.classList.remove(filledC)
        cell.id = `${i}${j}`
        board[i][j].class = "null"
        i++
        if (i == 6) {
            i = 0
            j++
        }
    })
    moves = 0
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
        moves++
    }
    // Checar se alguém ganhou
    if (checkWin(currentP)) {
        end(false)
    }
    // Checar se houve um empate
    else if (moves == 42) {
        end(true)
    }
    // Continua o jogo
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
    // Checar vertical
    if (
        ((i + 3) < 6) &&
        board[i][j].class == currentP &&
        board[i + 1][j].class == currentP &&
        board[i + 2][j].class == currentP &&
        board[i + 3][j].class == currentP
    ) {
        return true
    }
    // Checar horizontal
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 4; y++) {
            if (
                board[x][y].class == currentP &&
                board[x][y + 1].class == currentP &&
                board[x][y + 2].class == currentP &&
                board[x][y + 3].class == currentP
            ) {
                return true
            }
        }
    }
    // Checar diagonais
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) {
            if (
                board[x][y].class == currentP &&
                board[x + 1][y + 1].class == currentP &&
                board[x + 2][y + 2].class == currentP &&
                board[x + 3][y + 3].class == currentP
            ) {
                return true
            }
        }
    }
    for (let x = 0; x < 3; x++) {
        for (let y = 3; y < 7; y++) {
            if (
                board[x][y].class == currentP &&
                board[x + 1][y - 1].class == currentP &&
                board[x + 2][y - 2].class == currentP &&
                board[x + 3][y - 3].class == currentP
            ) {
                return true
            }
        }
    }
}

function end(draw) {
    if (draw) {
        winningMessage.innerText = "Empate!"
    } else {
        winningMessage.innerText = `${turn ? "Vermelho" : "Amarelo"} Ganhou!`
    }
    winningScreen.classList.add("show")
}