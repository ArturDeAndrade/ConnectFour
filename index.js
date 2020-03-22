const pOne = 'one'
const pTwo = 'two'
const nextC = 'next'
const filledC = 'filled'
const fullC = 'full'
let gameOn
let turn
let currentP
const columns = document.querySelectorAll('.column')
const pseudoCells = document.querySelectorAll('.pseudo')
const gameCells = document.querySelectorAll('.game')

start()

function start() {
    gameCells.forEach(cell => {
        cell.classList.remove(nextC)
        cell.classList.remove(filledC)
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
        placePiece(column, currentP);
        turn = !turn
    }
    // Checar se alguém ganhou
    //if (checkWin(currentP)) {}
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
    column.querySelector('.next').classList.add(currentP)
    column.querySelector('.next').classList.add(filledC)
    column.querySelector('.next').classList.remove(nextC)
    let temp = column.querySelectorAll('.game:not(.filled)')
    if (temp.length > 0) {
        temp[temp.length - 1].classList.add(nextC)
    } else {
        column.classList.add(fullC)
    }
}

/*
function checkwin(currentP) {
    gameCells.forEach(cell => {
    })
}
*/