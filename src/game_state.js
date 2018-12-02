export const gameState = Object.assign(Object.create(null), {
    players: ["P1", "P2"],
    turn: 0,
    activePlayer: "P1",
    over: false,
    score: Object.assign(Object.create("null"), {
        P1: 0,
        P2: 0
    })
});
