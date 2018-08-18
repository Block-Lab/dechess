function toDests(chess) {
  const dests = {};
  chess.SQUARES.forEach(s => {
    const ms = chess.moves({square: s, verbose: true});
    if (ms.length) dests[s] = ms.map(m => m.to);
  });
  return dests;
}

function toColor(chess) {
  return (chess.turn() === 'w') ? 'white' : 'black';
}

function playOtherSide(cg, chess) {
  return (orig, dest) => {
    chess.move({from: orig, to: dest, promotion: 'q'});
    cg.set({
      fen: chess.fen(),
      turnColor: toColor(chess),
      movable: {
        color: toColor(chess),
        dests: toDests(chess)
      }
    });
  };
}

function setBackground(element, background) {
  element.classList.remove('blue', 'brown', 'green', 'purple')
  element.classList.add(background)
}

function setPieceSet(element, pieceSet) {
  element.classList.remove(
    'alpha', 'cburnett', 'chess7', 'chessnut',
    'companion', 'fantasy', 'letter', 'merida',
    'pirouetti', 'reillycraig', 'riohacha', 'shapes',
    'spatial')
  element.classList.add(pieceSet)
}

function backgroundSelect() {
  var background = document.getElementById('background').value
  setBackground(document.getElementById('board'), background)
}

function pieceSetSelect() {
  var pieceSet = document.getElementById('pieceSet').value
  setPieceSet(document.getElementById('board'), pieceSet)
}

const chess = new Chess();
var options = {
      movable: {
        color: 'white',
        free: false,
        dests: toDests(chess)
      }
}

ground = Chessground(document.getElementById("board"), options);

ground.set({
  movable: { events: { after: playOtherSide(ground, chess) } }
});

backgroundSelect()
pieceSetSelect()
