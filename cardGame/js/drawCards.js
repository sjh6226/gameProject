import { drawCard } from './drawCard.js';

export function drawCards(ctx, cards, cardSize, padding, start, cardBackSrc) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    cards.forEach(card => {
        drawCard(card, ctx, cardSize, padding, start, cardBackSrc);
    });
}
