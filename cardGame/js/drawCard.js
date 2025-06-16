// drawCard.js: 카드 한 장을 캔버스에 그리는 함수 제공

import { getCardFaceImage } from './cardImage.js';

// drawCard: 카드 객체의 상태(앞/뒷면)에 따라 이미지를 선택해 지정 위치에 한 장만 그림
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
