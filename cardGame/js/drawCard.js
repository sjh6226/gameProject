import { getCardFaceImage } from './cardImage.js';

export function drawCard(card, ctx, cardSize, padding, start, cardBackSrc) {
    const x = card.getX(cardSize, padding, start);
    const y = card.getY(cardSize, padding, start);
    let img;
    if (!card.close) {
        img = getCardFaceImage(card.number);
    } else {
        img = new Image();
        img.src = cardBackSrc;
    }
    img.onload = function() {
        ctx.drawImage(img, x, y, cardSize, cardSize);
    };
    if (img.complete) {
        ctx.drawImage(img, x, y, cardSize, cardSize);
    }
}
