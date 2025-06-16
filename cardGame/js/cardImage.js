// cardImage.js: 카드 앞면 이미지를 반환하는 함수 제공

// 카드 번호에 해당하는 앞면 이미지를 반환
export function getCardFaceImage(cardNumber) {
    const img = new Image();
    img.src = `img/${cardNumber}.png`;
    return img;
}