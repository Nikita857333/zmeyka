// Константы
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20; // Размер одной клетки
const rows = canvas.height / scale;
const cols = canvas.width / scale;

// Игровые переменные
let snake;
let food;
let score;
let interval;

// Направления
const leftArrow = 37;
const upArrow = 38;
const rightArrow = 39;
const downArrow = 40;

// Стартовая функция
function init() {
    snake = [
        { x: 7, y: 5 },
        { x: 6, y: 5 },
        { x: 5, y: 5 }
    ];
    createFood();
    score = 0;
    clearInterval(interval);
    interval = setInterval(() => {
        update();
        draw();
    }, 150);
}

// Обновление игры
function update() {
    if (hasGameEnded()) {
        return endGame();
    }

    const head = { x: snake[0].x, y: snake[0].y };

    if (isEating(head)) {
        score++;
        createFood();
    } else {
        snake.pop();
    }

    addSegment(head);
}

// Отрисовка игры
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 20);

    snake.forEach(seg => {
        ctx.fillRect(seg.x * scale, seg.y * scale, scale, scale);
    });

    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
}

// Поведение змеи
function hasGameEnded() {
    const head = snake[0];
    const hitWall = head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows;
    const bitSelf = snake.some((seg, idx) => idx > 0 && seg.x === head.x && seg.y === head.y);
    return hitWall || bitSelf;
}

function isEating({ x, y }) {
    return food.x === x && food.y === y;
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };
}

function addSegment({ x, y }) {
    switch (direction) {
        case leftArrow:
            snake.unshift({ x: x - 1, y });
            break;
        case rightArrow:
            snake.unshift({ x: x + 1, y });
            break;
        case upArrow:
            snake.unshift({ x, y: y - 1 });
            break;
        case downArrow:
            snake.unshift({ x, y: y + 1 });
            break;
    }
}

// Завершение игры
function endGame() {
    clearInterval(interval);
    alert(`Игра завершена! Ваш счет: ${score}`);
    init();
}

// Управление
let direction = rightArrow;
window.addEventListener('keydown', e => {
    e.preventDefault();
    if ([leftArrow, upArrow, rightArrow, downArrow].includes(e.keyCode)) {
        direction = e.keyCode;
    }
});

init();
