const result = document.querySelector('.result-container');
const buttons = document.querySelectorAll('.btn, .op-btn');

let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay(value) {
    result.textContent = value;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;


        if (value === 'AC') {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('0');
            return;
        }

        
        if (value === '%') {
            const target = currentInput !== '' ? currentInput : previousInput;

            if (target !== '') {
                const percent = (parseFloat(target) / 100).toString();
                if (currentInput !== '') {
                    currentInput = percent;
                    updateDisplay(currentInput);
                } else {
                    previousInput = percent;
                    updateDisplay(previousInput);
                }
            }
            return;
        }


        if (['+', '-', 'x', '÷'].includes(value)) {
            if (currentInput === '' && previousInput !== '') {
                operator = value;
                return;
            }
            if (previousInput !== '' && operator !== '') {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
            return;
        }

        if (value === '=') {
            if (previousInput !== '' && operator !== '' && currentInput !== '') {
                calculate();
                operator = '';
            }
            return;
        }

        if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
            updateDisplay(currentInput);
            return;
        }

        if (!isNaN(value)) {
            currentInput += value;
            updateDisplay(currentInput);
        }

        if (value === '00') {
            currentInput += '00';
            updateDisplay(currentInput);
        }
    });
});

function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let resultValue = 0;

    switch (operator) {
        case '+':
            resultValue = num1 + num2;
            break;
        case '-':
            resultValue = num1 - num2;
            break;
        case 'x':
            resultValue = num1 * num2;
            break;
        case '÷':
            resultValue = num2 !== 0 ? num1 / num2 : 'Error';
            break;
    }

    updateDisplay(resultValue);
    currentInput = resultValue.toString();
    previousInput = '';
}
