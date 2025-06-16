// CardGame.js: 카드 게임의 전체 로직(초기화, 클릭 처리, 게임 상태 관리 등)을 담당하는 클래스 제공

import { Card } from './Card.js';
import { drawCards } from './drawCards.js';
import { initCards } from './initCards.js';

export class CardGame {
    constructor(canvas, ctx, rows, cols, padding) {
        // 게임판 설정 및 카드 초기화
        this.canvas = canvas;
        this.ctx = ctx;
        this.ROWS = rows;
        this.COLS = cols;
        this.PADDING = padding;
        this.CARD_SIZE = Math.floor((canvas.width - this.PADDING * (this.COLS + 1)) / this.COLS);
        this.START = this.PADDING;
        this.cardBackSrc = 'img/check.png';

        this.cards = [];
        this.firstCard = null;
        this.secondCard = null;
        this.lock = false;

        // 카드 생성 및 초기 그리기
        initCards(this, Card, this.ROWS, this.COLS);
        drawCards(this.ctx, this.cards, this.CARD_SIZE, this.PADDING, this.START, this.cardBackSrc);
        this.canvas.addEventListener('click', this.handleClick.bind(this));
    }

    // 카드 클릭 이벤트 처리
    handleClick(e) {
        if (this.lock) return;
        const rect = this.canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        for (let card of this.cards) {
            if (card.isClicked(mx, my, this.CARD_SIZE, this.PADDING, this.START) && card.close) {
                if (this.firstCard && this.secondCard) return;

                card.close = false;
                drawCards(this.ctx, this.cards, this.CARD_SIZE, this.PADDING, this.START, this.cardBackSrc);

                if (!this.firstCard) {
                    this.firstCard = card;
                } else if (!this.secondCard && card !== this.firstCard) {
                    this.secondCard = card;
                    this.lock = true;
                    setTimeout(() => {
                        if (this.firstCard.number !== this.secondCard.number) {
                            this.firstCard.close = true;
                            this.secondCard.close = true;
                        }
                        this.firstCard = null;
                        this.secondCard = null;
                        this.lock = false;
                        drawCards(this.ctx, this.cards, this.CARD_SIZE, this.PADDING, this.START, this.cardBackSrc);

                        if (this.cards.every(c => !c.close)) {
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
}
