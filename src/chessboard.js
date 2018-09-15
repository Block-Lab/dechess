import { Chessground } from 'chessground'
import Chess from 'chess.js'

import './chessground.css'
import './chessground-theme.css'

function toDests (chess) {
  var dests = {}
  chess.SQUARES.forEach(square => {
    dests[square] = chess.moves({ square: square }).map(move => move.to)
  })
  return dests
}

function toColor (chess) {
  return (chess.turn() === 'w') ? 'white' : 'black'
}

function playOtherSide (cg, chess) {
  return (from, to) => {
    chess.move({ from: from, to: to, promotion: 'q' })
    cg.set({
      fen: chess.fen(),
      turnColor: toColor(chess),
      movable: { color: toColor(chess), dests: toDests(chess) }
    })
  }
}

export function createChessboard () {
  var chess = new Chess()
  var options = {
    movable: {
      color: 'white',
      free: 'false',
      dests: toDests(chess)
    }
  }

  var board = document.createElement('div')
  board.setAttribute('id', 'board')
  board.classList.add('merida')
  board.classList.add('blue')
  document.body.appendChild(board)

  var ground = Chessground(board, options)
  ground.set({ movable: { events: { after: playOtherSide(ground, chess) } } })
}
