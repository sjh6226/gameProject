// main.js: RhythmGame 인스턴스 생성 및 게임 시작 함수(window.gameStart) 연결

import { RhythmGame } from './RhythmGame.js';

const rhythmGame = new RhythmGame();
window.gameStart = () => rhythmGame.gameStart();
