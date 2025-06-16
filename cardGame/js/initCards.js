export function initCards(gameInstance, CardClass, rows, cols) {
    let cardNumbers = [];
    const pairCount = (rows * cols) / 2;
    for (let i = 1; i <= pairCount; i++) {
        cardNumbers.push(i, i);
    }
    for (let i = cardNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardNumbers[i], cardNumbers[j]] = [cardNumbers[j], cardNumbers[i]];
    }
    gameInstance.cards = [];
    let idx = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            gameInstance.cards.push(new CardClass(row, col, cardNumbers[idx++]));
        }
    }
    gameInstance.firstCard = null;
    gameInstance.secondCard = null;
    gameInstance.lock = false;
}
