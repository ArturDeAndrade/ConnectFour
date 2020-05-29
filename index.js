// Criando uma variável para acompanhar quais peças estão ocupando quais casas.
let board = []
for (let i = 0; i < 6; i++) {
    board[i] = new Array(7)
}
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
        board[i][j] = [{ piece: "null", pos: `${i}${j}` }]
    }
}
/*
Criando variáveis com o nome de classes 
que serão usadas para acompanhar os movimentos realizados.
*/
const pOne = 'one'
const pTwo = 'two'
const nextC = 'next'
const filledC = 'filled'
const fullC = 'full'
const lastC = 'last'
/*
Criando variáveis para acompanhar o número de movimentos 
e determinar de quem é a vez.
*/
let moves
let turn
let currentP
// Adicionando a função que inicia o jogo ao botão de restart.
document.getElementById('restartButton').addEventListener('click', start)
// Chamando a função que inicia o jogo.
start()
// Declarando a função que inicia o jogo.
function start() {
    /*
    Removendo a tela de vitória
    (pois essa função é chamada quando o jogo é reiniciado).
    */
    document.getElementById('winningScreen').classList.remove("show")
    // As variáveis 'i' e 'j' são criadas para preencher a variável "board".
    let i = 0
    let j = 0
    // Resetando as casas do tabuleiro.
    document.querySelectorAll('.game').forEach(cell => {
        // Removendo quaisquer classes do jogo anterior.
        cell.classList.remove(pOne)
        cell.classList.remove(pTwo)
        cell.classList.remove(nextC)
        cell.classList.remove(filledC)
        // Adicionando uma id à casa correspondente à sua posição.
        cell.id = `${i}${j}`
        // Resetando as informações de peças da variável "board".
        board[i][j].piece = "null"
        // Iteração manual da variável "board".
        i++
        if (i == 6) {
            i = 0
            j++
        }
    })
    // Resetando as variáveis de movimentos e turno.
    moves = 0
    turn = true
    currentP = turn ? pOne : pTwo
    // Resetando as colunas.
    document.querySelectorAll('.column').forEach(column => {
        // Removendo quaisquer classes do jogo anterior.
        column.classList.remove(fullC)
        column.querySelector('.pseudo').classList.remove(pOne)
        column.querySelector('.pseudo').classList.remove(pTwo)
        /*
        Adicionando a classe que determina de quem é a vez às pseudo-casas
        (os espaços acima do tabuleiro que indicam a coluna em destaque 
        e a peça que será colocada, na cor do jogador correspondente).
        */
        column.querySelector('.pseudo').classList.add(currentP)
        /*
        Criando uma variável temporária que seleciona as casas de uma coluna 
        e adiciona a classe 'next' à última casa vazia, o que indicará 
        que essa casa deve ser a próxima a ser preenchida.
        */
        let temp = column.querySelectorAll('.game')
        temp[temp.length - 1].classList.add(nextC)
        /*
        Adicionando um EventListener que determina 
        o que acontece quando uma jogada é realizada.
        */
        column.addEventListener('click', nextTurn)
    })
}
// Declarando a função que é chamada a cada novo movimento.
function nextTurn(e) {
    // Selecionando a coluna que contém a casa alvo.
    const cell = e.target
    const column = cell.parentElement
    // Checando de quem é a vez.
    currentP = turn ? pOne : pTwo
    // Realizando o movimento(se a coluna não estiver cheia).
    if (!column.classList.contains(fullC)) {
        placePiece(column, currentP)
        turn = !turn
        moves++
    }
    // Checando se alguém ganhou.
    if (checkWin(currentP)) {
        end(false)
    }
    // Checando se houve um empate.
    else if (moves == 42) {
        end(true)
    }
    // Checando de quem é a vez.
    currentP = turn ? pOne : pTwo
    // Resetando as pseudo-casas.
    document.querySelectorAll('.column').forEach(column => {
        column.querySelector('.pseudo').classList.remove(pOne)
        column.querySelector('.pseudo').classList.remove(pTwo)
        column.querySelector('.pseudo').classList.add(currentP)
    })
}
// Declarando a função que posiciona uma peça.
function placePiece(column, currentP) {
    // Selecionando a última casa vazia.
    let nextCell = column.querySelector('.next')
    // TODO: Continuar a documentação do código a partir daqui.
    const id = nextCell.id
    const i = Math.floor(id / 10)
    const j = id % 10
    board[i][j].piece = currentP
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
        board[i][j].piece == currentP &&
        board[i + 1][j].piece == currentP &&
        board[i + 2][j].piece == currentP &&
        board[i + 3][j].piece == currentP
    ) {
        return true
    }
    // Checar horizontal
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 4; y++) {
            if (
                board[x][y].piece == currentP &&
                board[x][y + 1].piece == currentP &&
                board[x][y + 2].piece == currentP &&
                board[x][y + 3].piece == currentP
            ) {
                return true
            }
        }
    }
    // Checar diagonais
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) {
            if (
                board[x][y].piece == currentP &&
                board[x + 1][y + 1].piece == currentP &&
                board[x + 2][y + 2].piece == currentP &&
                board[x + 3][y + 3].piece == currentP
            ) {
                return true
            }
        }
    }
    for (let x = 0; x < 3; x++) {
        for (let y = 3; y < 7; y++) {
            if (
                board[x][y].piece == currentP &&
                board[x + 1][y - 1].piece == currentP &&
                board[x + 2][y - 2].piece == currentP &&
                board[x + 3][y - 3].piece == currentP
            ) {
                return true
            }
        }
    }
}

function end(draw) {
    if (draw) {
        document.getElementById('winningMessage').innerText = "Empate!"
    } else {
        document.getElementById('winningMessage').innerText = `${turn ? "Vermelho" : "Amarelo"} Ganhou!`
    }
    document.getElementById('winningScreen').classList.add("show")
}