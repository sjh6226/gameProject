export class Card {
    constructor(row, col, number) {
        this.row = row;
        this.col = col;
        this.number = number;
        this.close = true;
    }

    getX(cardSize, padding, start) {
        return start + this.col * (cardSize + padding);
    }

    getY(cardSize, padding, start) {
        return start + this.row * (cardSize + padding);
    }

    isClicked(mx, my, cardSize, padding, start) {
        const x = this.getX(cardSize, padding, start);
        const y = this.getY(cardSize, padding, start);
        return (
            mx >= x && mx <= x + cardSize &&
            my >= y && my <= y + cardSize
        );
    }
}