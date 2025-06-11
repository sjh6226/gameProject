import { shuffle, drawCards, handleClick } from './utils.js';

// CardGame 클래스: 게임 전체를 관리합니다.
export class CardGame {
    constructor(canvasId) {
        // 캔버스와 그리기 컨텍스트 가져오기
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // 카드와 캔버스 레이아웃 관련 상수
        this.ROWS = 4; // 행 개수
        this.COLS = 4; // 열 개수
        this.PADDING = 10; // 카드 사이 간격
        // 카드 한 변의 크기 계산
        this.CARD_SIZE = Math.floor((this.canvas.width - this.PADDING * (this.COLS + 1)) / this.COLS);
        this.START = this.PADDING; // 시작 위치

        this.cardBackSrc = 'img/check.png'; // 카드 뒷면 이미지

        this.cards = []; // 카드 정보 배열
        // 카드 선택 상태를 참조 객체로 관리 (모듈 함수와 연동 위해)
        this.firstCardRef = { value: null };
        this.secondCardRef = { value: null };
        this.lockRef = { value: false };

        this.init();      // 카드 배열 초기화
        this.drawCards(); // 카드 그리기

        // 클릭 이벤트 등록 (this 유지 위해 bind 사용)
        this.canvas.addEventListener('click', this._handleClickWrapper.bind(this));
    }

    // 카드 배열을 초기화하는 함수
    init() {
        let cardNumbers = [];
        // 1~8까지 두 번씩 넣어서 배열 생성
        for (let i = 1; i <= 8; i++) {
            cardNumbers.push(i, i);
        }
        shuffle(cardNumbers); // 카드 번호 섞기

        // 카드 정보 객체 생성
        this.cards = [];
        let idx = 0;
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                this.cards.push({
                    row,
                    col,
                    number: cardNumbers[idx++], // 카드 번호 할당
                    close: true                 // 처음엔 모두 닫힘
                });
            }
        }
        // 선택 상태 초기화
        this.firstCardRef.value = null;
        this.secondCardRef.value = null;
        this.lockRef.value = false;
    }

    // 모든 카드를 캔버스에 그리는 함수
    drawCards() {
        drawCards(
            this.ctx,
            this.cards,
            this.CARD_SIZE,
            this.PADDING,
            this.START,
            this.cardBackSrc
        );
    }

    // 클릭 이벤트 핸들러 (handleClick 모듈 함수에 현재 상태 전달)
    _handleClickWrapper(e) {
        handleClick(
            e,
            this.canvas,
            this.cards,
            this.CARD_SIZE,
            this.PADDING,
            this.START,
            this.firstCardRef,
            this.secondCardRef,
            this.lockRef,
            this.drawCards.bind(this),
            () => { window.location.href = 'clear.html'; } // 게임 클리어 시 이동
        );
    }
}