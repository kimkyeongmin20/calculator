const display = document.getElementById('display');
const buttons = document.querySelector('.calculator-buttons');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

// 버튼 클릭 이벤트 처리
buttons.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.classList.contains('btn')) return;

    const value = target.getAttribute('data-value');
    const action = target.getAttribute('data-action');

    // 숫자 버튼 클릭
    if (value !== null) {
        handleNumber(value);
        updateDisplay();
        return;
    }

    // 연산자 및 기능 버튼 클릭
    if (action) {
        switch (action) {
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                handleOperator(action);
                break;
            case 'calculate':
                calculate();
                break;
            case 'clear':
                clearCalculator();
                break;
        }
        updateDisplay();
    }
});

function handleNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
}

function handleOperator(nextOperator) {
    if (operator && shouldResetDisplay) {
        operator = nextOperator;
        return;
    }

    if (previousInput && operator && !shouldResetDisplay) {
        calculate();
    }

    operator = nextOperator;
    previousInput = currentInput;
    shouldResetDisplay = true;
}

function calculate() {
    if (!operator || previousInput === '') return;

    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case 'add':
            result = prev + curr;
            break;
        case 'subtract':
            result = prev - curr;
            break;
        case 'multiply':
            result = prev * curr;
            break;
        case 'divide':
            if (curr === 0) {
                alert('0으로 나눌 수 없습니다.');
                clearCalculator();
                return;
            }
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = String(result);
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
}

function updateDisplay() {
    // 디스플레이 글자 수가 너무 길어질 경우 처리
    if (currentInput.length > 12) {
        display.textContent = Number(currentInput).toExponential(6);
    } else {
        display.textContent = currentInput;
    }
}