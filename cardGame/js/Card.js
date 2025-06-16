// Card 클래스: 카드 한 장의 정보를 저장하고, 위치 계산 및 클릭 판정 기능을 제공
export class Card {
    constructor(row, col, number) {
        // 카드의 행, 열 위치와 카드 번호(짝 맞추기용), 닫힘 상태
        this.row = row;
        this.col = col;
        this.number = number;
        this.close = true;
    }

    // 카드의 X 좌표 계산
    getX(cardSize, padding, start) {
        return start + this.col * (cardSize + padding);
    }

    // 카드의 Y 좌표 계산
    getY(cardSize, padding, start) {
        return start + this.row * (cardSize + padding);
    }

    // 마우스 좌표(mx, my)가 카드 영역 안에 있는지 판정
    isClicked(mx, my, cardSize, padding, start) {
        const x = this.getX(cardSize, padding, start);
        const y = this.getY(cardSize, padding, start);
        return (
            mx >= x && mx <= x + cardSize &&
            my >= y && my <= y + cardSize
        );
    }
}