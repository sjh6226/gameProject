import { getCardFaceImage } from './getCardFaceImage.js';

// 카드 배열을 캔버스에 그리는 함수
export function drawCards(ctx, cards, CARD_SIZE, PADDING, START, cardBackSrc) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    cards.forEach(card => {
        // 카드 위치 계산
        const x = START + card.col * (CARD_SIZE + PADDING);
        const y = START + card.row * (CARD_SIZE + PADDING);
        let img;
        if (!card.close) {
            // 카드가 열려있으면 앞면 이미지
            img = getCardFaceImage(card.number);
        } else {
            // 카드가 닫혀있으면 뒷면 이미지
            img = new Image();
            img.src = cardBackSrc;
        }
        img.onload = () => {
            ctx.drawImage(img, x, y, CARD_SIZE, CARD_SIZE);
        };
        if (img.complete) {
            ctx.drawImage(img, x, y, CARD_SIZE, CARD_SIZE);
        }
    });
}