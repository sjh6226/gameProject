// drawCards.js: 카드 여러 장을 캔버스에 그리는 함수 제공

import { drawCard } from './drawCard.js';

// drawCards: 카드 배열을 받아 모든 카드를 반복적으로 그림
export function drawCards(ctx, cards, cardSize, padding, start, cardBackSrc) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    cards.forEach(card => {
        drawCard(card, ctx, cardSize, padding, start, cardBackSrc);
    });
}
