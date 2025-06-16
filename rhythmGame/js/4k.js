// 4k.js: 4키 리듬 게임의 전체 동작(노트 생성, 판정, 점수, 타이머 등)을 담당하는 클래스 및 실행 코드

class RhythmGame {
    constructor() {
        this.gameArea = document.getElementById("gameArea");
        this.comboDisplay = document.getElementById("combo");
        this.increaseSpeedButton = document.getElementById("increaseSpeed");
        this.decreaseSpeedButton = document.getElementById("decreaseSpeed");
        this.scoreDisplay = document.getElementById("score");
        this.timerDisplay = document.getElementById("timer");

        this.combo = 0;
        this.speed = 25;
        this.judgeLinePosition = 450;
        this.score = 0;
        this.noteInterval = null;
        this.gameTimer = null;
        this.gameTimeLimit = 160;
        this.timeLeft = this.gameTimeLimit;
        this.gameActive = false;
        this.keys = ["1", "2", "8", "9"];

        this.bindEvents();
    }

    // 이벤트 바인딩(속도 조절, 키 입력 등)
    bindEvents() {
        this.increaseSpeedButton.addEventListener("click", () => {
            this.speed = Math.min(this.speed + 1, 50);
            if (this.noteInterval && this.gameActive) this.startGame();
        });

        this.decreaseSpeedButton.addEventListener("click", () => {
            this.speed = Math.max(this.speed - 1, 1);
            if (this.noteInterval && this.gameActive) this.startGame();
        });

        document.addEventListener("keypress", (event) => this.handleKeyPress(event));
    }

    // 노트 생성 및 애니메이션
    createNote() {
        if (!this.gameActive) return;
        const randomKey = this.keys[Math.floor(Math.random() * this.keys.length)];
        const note = document.createElement("div");
        note.classList.add("note");
        note.innerText = randomKey;
        note.style.left = (this.keys.indexOf(randomKey) * (this.gameArea.clientWidth / this.keys.length)) + "px";
        note.style.top = "0px";
        this.gameArea.appendChild(note);

        let position = 0;
        const interval = setInterval(() => {
            position += this.speed;
            note.style.top = position + "px";

            if (position >= this.judgeLinePosition + 30) {
                clearInterval(interval);
                if (this.gameArea.contains(note)) this.gameArea.removeChild(note);
                this.combo = 0;
                this.comboDisplay.innerText = this.combo;
                this.comboDisplay.style.visibility = "hidden";
            }
            if (!this.gameActive) {
                clearInterval(interval);
                if (this.gameArea.contains(note)) this.gameArea.removeChild(note);
            }
        }, 50);
        note._interval = interval;
    }

    // 게임 시작(노트 생성 타이머 시작)
    startGame() {
        clearInterval(this.noteInterval);
        this.noteInterval = setInterval(() => {
            this.createNote();
        }, 800 / (this.speed / 25));
    }

    // 키 입력 판정 및 점수/콤보 처리
    handleKeyPress(event) {
        if (!this.gameActive) return;
        const notes = document.querySelectorAll(".note");
        let comboIncreased = false;
        notes.forEach(note => {
            const notePosition = parseInt(note.style.top);
            if (
                this.keys.includes(event.key) &&
                note.innerText === event.key &&
                notePosition >= this.judgeLinePosition - 20 &&
                notePosition <= this.judgeLinePosition + 50
            ) {
                if (note._interval) clearInterval(note._interval);
                if (this.gameArea.contains(note)) this.gameArea.removeChild(note);
                if (!comboIncreased) {
                    comboIncreased = true;
                    this.combo++;
                    this.comboDisplay.innerText = this.combo;
                    this.comboDisplay.style.visibility = "visible";
                }
                this.score += 10;
                this.scoreDisplay.innerText = this.score;
            }
        });
    }

    // 타이머 UI 갱신
    updateTimer() {
        if (this.timerDisplay) {
            const min = Math.floor(this.timeLeft / 60);
            const sec = this.timeLeft % 60;
            this.timerDisplay.innerText = `${min}:${sec.toString().padStart(2, "0")}`;
        }
    }

    // 게임 전체 초기화 및 시작
    gameStart() {
        this.combo = 0;
        this.score = 0;
        this.timeLeft = this.gameTimeLimit;
        this.comboDisplay.innerText = this.combo;
        this.comboDisplay.style.visibility = "hidden";
        this.scoreDisplay.innerText = this.score;
        if (this.timerDisplay) this.updateTimer();
        document.querySelectorAll(".note").forEach(note => note.remove());
        clearInterval(this.noteInterval);
        clearInterval(this.gameTimer);

        this.gameActive = true;
        this.startGame();

        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            if (this.timeLeft <= 0) {
                clearInterval(this.noteInterval);
                clearInterval(this.gameTimer);
                this.gameActive = false;
                document.querySelectorAll(".note").forEach(note => note.remove());
                alert(`게임 종료! 최종 점수: ${this.score}`);
            }
        }, 1000);
    }
}

// 인스턴스 생성 및 게임 시작 함수 연결
const rhythmGame = new RhythmGame();
window.gameStart = () => rhythmGame.gameStart();
