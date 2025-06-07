const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 카드와 캔버스 레이아웃 관련 상수
const ROWS = 4, COLS = 4;
const PADDING = 10;
const CARD_SIZE = Math.floor((canvas.width - PADDING * (COLS + 1)) / COLS);
const START = PADDING;

const cardBackSrc = 'images/check.png';
// 카드 페이스 이미지를 직접 두 번씩 배열에 넣음
const cardFaceSrcs = [
    'images/1.png', 'images/1.png',
    'images/2.png', 'images/2.png',
    'images/3.png', 'images/3.png',
    'images/4.png', 'images/4.png',
    'images/5.png', 'images/5.png',
    'images/6.png', 'images/6.png',
    'images/7.png', 'images/7.png',
    'images/8.png', 'images/8.png'
];

let cards = [], flipped = [], matched = 0, lock = false;
let cardBackImg, cardFaceImgs;

/**
 * 배열을 무작위로 섞는 함수
 * @param {Array} arr - 섞을 배열
 * @returns {Array} 섞인 배열
 */
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/**
 * 이미지들을 비동기로 모두 로드한 후 콜백을 호출하는 함수
 * @param {Array} srcs - 이미지 경로 배열
 * @param {Function} cb - 모든 이미지 로드 후 호출될 콜백
 */
function loadImages(srcs, cb) {
    let imgs = [], loaded = 0;
    srcs.forEach((src, i) => {
        const img = new Image();
        img.onload = () => { if (++loaded === srcs.length) cb(imgs); };
        img.src = src;
        imgs[i] = img;
    });
}

/**
 * 게임을 초기화하고 카드 배열을 셔플하여 배치하는 함수
 */
function setupGame() {
    // 카드 페이스 이미지 인덱스 배열을 셔플
    const indices = shuffle([...Array(16).keys()]);
    cards = indices.map((shuffledIdx, i) => ({
        face: shuffledIdx, // 카드 페이스 인덱스
        flipped: false,
        matched: false,
        x: START + (i % COLS) * (CARD_SIZE + PADDING),
        y: START + Math.floor(i / COLS) * (CARD_SIZE + PADDING)
    }));
    flipped = [];
    matched = 0;
    lock = false;
    draw();
}

/**
 * 현재 카드 상태를 캔버스에 그리는 함수
 */
function draw() {
    // 이미지가 모두 로드되지 않았으면 그리지 않음
    if (!cardBackImg || !cardFaceImgs || cardFaceImgs.length !== 16) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cards.forEach(card => {
        const img = (card.flipped || card.matched)
            ? cardFaceImgs[card.face]
            : cardBackImg;
        ctx.drawImage(img, card.x, card.y, CARD_SIZE, CARD_SIZE);
    });
}

/**
 * 주어진 좌표(mx, my)에 해당하는 카드 인덱스를 반환하는 함수
 * @param {number} mx - 마우스 x좌표
 * @param {number} my - 마우스 y좌표
 * @returns {number} 카드 인덱스, 없으면 -1
 */
function cardIndexAt(mx, my) {
    return cards.findIndex(card =>
        mx >= card.x && mx <= card.x + CARD_SIZE &&
        my >= card.y && my <= card.y + CARD_SIZE
    );
}

// 캔버스 클릭 이벤트 핸들러: 카드 뒤집기 및 매칭 처리
canvas.onclick = e => {
    if (lock) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const idx = cardIndexAt(mx, my);
    if (idx < 0 || cards[idx].flipped || cards[idx].matched) return;

    cards[idx].flipped = true;
    flipped.push(idx);
    draw();

    if (flipped.length === 2) {
        lock = true;
        setTimeout(() => {
            const [a, b] = flipped;
            if (cards[a].face === cards[b].face) {
                cards[a].matched = cards[b].matched = true;
                matched += 2;
            } else {
                cards[a].flipped = cards[b].flipped = false;
            }
            flipped = [];
            draw();
            lock = false;
            if (matched === cards.length) setTimeout(() => alert('축하합니다! 모두 맞췄어요!'), 100);
        }, 700);
    }
};

// 이미지 로드가 끝나면 게임을 시작
// cardFaceSrcs의 모든 이미지를 순서대로 로드
loadImages([cardBackSrc, ...cardFaceSrcs], imgs => {
    cardBackImg = imgs[0];
    cardFaceImgs = imgs.slice(1); // 0~15: 1.png~8.png 두 번씩
    setupGame();
});
