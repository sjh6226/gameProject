// 더 간단하게 이미지 불러오는 함수

// 카드 번호에 맞는 앞면 이미지를 반환하는 함수
export function getCardFaceImage(cardNumber) {
    const img = new Image();
    img.src = `img/${cardNumber}.png`;
    return img;
}

// 기존에 이미지 불러오는 함수였던 코드

/* // 카드 번호에 맞는 앞면 이미지를 반환하는 함수
const cardImageMap = {
    1: '1.png',
    2: '2.png',
    3: '3.png',
    4: '4.png',
    5: '5.png',
    6: '6.png',
    7: '7.png',
    8: '8.png'
    // 필요한 만큼 추가
};

export function getCardFaceImage(cardNumber) {
    const img = new Image();
    img.src = `img/${cardImageMap[cardNumber]}`;
    return img;
} */