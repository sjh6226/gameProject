// 카드 번호에 맞는 앞면 이미지를 반환하는 함수
export function getCardFaceImage(cardNumber) {
    const img = new Image();
    img.src = `img/${cardNumber}.png`;
    return img;
}