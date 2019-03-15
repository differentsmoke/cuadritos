const P1 = "P1";
const P2 = "P2";
export const gameState = Object.assign(Object.create(null), {
    players: [P1, P2],
    turn: 0,
    size: 3 * 3,
    activePlayer: P1,
    over: false,
    squaresClosed: 0,
    score: Object.assign(Object.create(null), {
        [P1]: 0,
        [P2]: 0
    }),
    winner: null,
    updateGame,
    scorePoint
});

function updateGame() {
    const { activePlayer, players, squaresClosed, score } = gameState;
    if (squaresClosed > 0) {
        score[activePlayer] = score[activePlayer] + squaresClosed;
        gameState.squaresClosed = 0;
        if (score[P1] + score[P2] === gameState.size) {
            gameState.winner = score[P1] > score[P2] ? P1 : P2;
            console.log(`Game Finished! Contratulations ${gameState.winner}`);
            return undefined;
        }
    } else {
        const newPlayer = players.filter(player => player !== activePlayer)[0];
        gameState.activePlayer = newPlayer;
    }

    console.log(JSON.stringify(score, null, "\t"));
    console.log(`Your turn player ${activePlayer}`);
}

function scorePoint() {
    gameState.squaresClosed += 1;
}
