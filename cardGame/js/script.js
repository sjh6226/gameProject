// script.js: 카드 게임 실행을 위한 초기 설정 및 CardGame 인스턴스 생성

import { CardGame } from './CardGame.js';
import { DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_PADDING } from './constants.js';

// 캔버스와 컨텍스트 객체 가져오기
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 난이도 조절: 행/열/패딩을 원하는 값으로 변경
const rows = DEFAULT_ROWS; // 예: 4, 5, 6 등
const cols = DEFAULT_COLS; // 예: 4, 5, 6 등
const padding = DEFAULT_PADDING;

// 게임 인스턴스 생성 및 실행
const game = new CardGame(canvas, ctx, rows, cols, padding);


