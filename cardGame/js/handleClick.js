// 카드 클릭 시 동작을 처리하는 함수
export function handleClick(
    e,
    canvas,
    cards,
    CARD_SIZE,
    PADDING,
    START,
    firstCardRef,
    secondCardRef,
    lockRef,
    drawCards,
    onClear
) {
    if (lockRef.value) return; // 애니메이션 중이면 무시
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (let card of cards) {
        // 카드 위치 계산
        const x = START + card.col * (CARD_SIZE + PADDING);
        const y = START + card.row * (CARD_SIZE + PADDING);
        // 클릭한 위치가 카드 영역 안인지 확인
        if (
            mx >= x && mx <= x + CARD_SIZE &&
            my >= y && my <= y + CARD_SIZE &&
            card.close
        ) {
            if (firstCardRef.value && secondCardRef.value) return;

            card.close = false; // 카드 열기
            drawCards();

            if (!firstCardRef.value) {
                firstCardRef.value = card;
            } else if (!secondCardRef.value && card !== firstCardRef.value) {
                secondCardRef.value = card;
                lockRef.value = true;
                setTimeout(() => {
                    if (firstCardRef.value.number === secondCardRef.value.number) {
                        // 맞춘 경우 그대로 둠
                    } else {
                        // 틀린 경우 다시 닫기
                        firstCardRef.value.close = true;
                        secondCardRef.value.close = true;
                    }
                    firstCardRef.value = null;
                    secondCardRef.value = null;
                    lockRef.value = false;
                    drawCards();

                    // 모든 카드가 열렸는지 확인 (게임 클리어)
                    if (cards.every(c => !c.close)) {
                        setTimeout(onClear, 2000);
                    }
                }, 800);
            }
            break;
        }
    }
}