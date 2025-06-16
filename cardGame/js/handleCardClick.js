// handleCardClick.js: 카드 클릭 이벤트를 처리하는 함수 제공

import { drawCards } from './drawCards.js';

// handleCardClick: 클릭된 카드의 상태를 변경하고, 게임 로직(짝 맞추기, 잠금, 클리어 판정 등)을 처리
export function handleCardClick(gameInstance, e) {
    if (gameInstance.lock) return;
    const rect = gameInstance.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (let card of gameInstance.cards) {
        if (card.isClicked(mx, my, gameInstance.CARD_SIZE, gameInstance.PADDING, gameInstance.START) && card.close) {
            if (gameInstance.firstCard && gameInstance.secondCard) return;

            card.close = false;
            drawCards(gameInstance.ctx, gameInstance.cards, gameInstance.CARD_SIZE, gameInstance.PADDING, gameInstance.START, gameInstance.cardBackSrc);

            if (!gameInstance.firstCard) {
                gameInstance.firstCard = card;
            } else if (!gameInstance.secondCard && card !== gameInstance.firstCard) {
                gameInstance.secondCard = card;
                gameInstance.lock = true;
                setTimeout(() => {
                    if (gameInstance.firstCard.number !== gameInstance.secondCard.number) {
                        gameInstance.firstCard.close = true;
                        gameInstance.secondCard.close = true;
                    }
                    gameInstance.firstCard = null;
                    gameInstance.secondCard = null;
                    gameInstance.lock = false;
                    drawCards(gameInstance.ctx, gameInstance.cards, gameInstance.CARD_SIZE, gameInstance.PADDING, gameInstance.START, gameInstance.cardBackSrc);

                    if (gameInstance.cards.every(c => !c.close)) {
                        setTimeout(() => {
                            window.location.href = 'clear.html';
                        }, 2000);
                    }
                }, 800);
            }
            break;
        }
    }
}
