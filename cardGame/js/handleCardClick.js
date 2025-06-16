// handleCardClick.js: 카드 클릭 이벤트를 처리하는 함수 제공

import { drawCards } from './drawCards.js';

// handleCardClick: 클릭된 카드의 상태를 변경하고, 게임 로직(짝 맞추기, 잠금, 클리어 판정 등)을 처리
export function handleCardClick(gameInstance, e) {
    // 게임이 잠금 상태면 클릭 무시
    if (gameInstance.lock) return;
    // 마우스 좌표 계산
    const rect = gameInstance.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // 모든 카드에 대해 클릭된 카드 찾기
    for (let card of gameInstance.cards) {
        // 카드가 클릭됐고 닫혀있는 경우만 처리
        if (card.isClicked(mx, my, gameInstance.CARD_SIZE, gameInstance.PADDING, gameInstance.START) && card.close) {
            // 이미 두 장이 선택된 상태면 무시
            if (gameInstance.firstCard && gameInstance.secondCard) return;

            // 카드를 오픈(닫힘 해제)
            card.close = false;
            // 전체 카드 다시 그림
            drawCards(gameInstance.ctx, gameInstance.cards, gameInstance.CARD_SIZE, gameInstance.PADDING, gameInstance.START, gameInstance.cardBackSrc);

            if (!gameInstance.firstCard) {
                // 첫 번째 카드 선택
                gameInstance.firstCard = card;
            } else if (!gameInstance.secondCard && card !== gameInstance.firstCard) {
                // 두 번째 카드 선택
                gameInstance.secondCard = card;
                // 추가 클릭 방지(잠금)
                gameInstance.lock = true;
                setTimeout(() => {
                    // 두 카드가 다르면 다시 닫음
                    if (gameInstance.firstCard.number !== gameInstance.secondCard.number) {
                        gameInstance.firstCard.close = true;
                        gameInstance.secondCard.close = true;
                    }
                    // 선택 상태 초기화 및 잠금 해제
                    gameInstance.firstCard = null;
                    gameInstance.secondCard = null;
                    gameInstance.lock = false;
                    // 전체 카드 다시 그림
                    drawCards(gameInstance.ctx, gameInstance.cards, gameInstance.CARD_SIZE, gameInstance.PADDING, gameInstance.START, gameInstance.cardBackSrc);

                    // 모든 카드가 열렸으면 클리어 처리
                    if (gameInstance.cards.every(c => !c.close)) {
                        setTimeout(() => {
                            window.location.href = 'clear.html';
                        }, 2000);
                    }
                }, 800); // 0.8초 후 처리
            }
            break;
        }
    }
}
