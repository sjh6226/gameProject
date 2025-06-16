// initCards.js: 카드 게임의 카드 배열을 초기화(짝 맞추기용 번호 섞기 및 배치)하는 함수 제공

// initCards: 게임 인스턴스에 카드 객체들을 생성하고 섞어서 배치
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
