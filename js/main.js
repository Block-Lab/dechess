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
    chess.move({from: orig, to: dest});
    cg.set({
      turnColor: toColor(chess),
      movable: {
        color: toColor(chess),
        dests: toDests(chess)
      }
    });
  };
}

const chess = new Chess();
var options = {
      movable: {
        color: 'white',
        free: false,
        dests: toDests(chess)
      }
}

ground = Chessground(document.getElementById("dirty"), options);

ground.set({
  movable: { events: { after: playOtherSide(ground, chess) } }
});
