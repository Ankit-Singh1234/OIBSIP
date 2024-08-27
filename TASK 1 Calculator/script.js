document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let expression = '';

    const updateDisplay = () => {
        display.textContent = expression || '0';
    };
    
    const handleButtonClick = (event) => {
        const value = event.target.textContent;

        if (value === 'AC') {
            expression = '';
        } else if (value === '←') {
            expression = expression.slice(0, -1);
        } else if (value === '=') {
            try {
                expression = eval(expression).toString();
            } catch {
                expression = 'Error';
            }
        } else if (value === 'π') {
            expression += Math.PI;
        } else if (value === '√') {
            expression = Math.sqrt(eval(expression)).toString();
        } else if (value === '∛') {
            expression = Math.cbrt(eval(expression)).toString();
        } else if (value === 'x²') {
            expression = Math.pow(eval(expression), 2).toString();
        } else if (value === 'x³') {
            expression = Math.pow(eval(expression), 3).toString();
        } else if (value === 'x^y') {
            expression += '**'; 
        } else if (value === 'e^x') {
            expression = Math.exp(eval(expression)).toString();
        } else if (value === '10^x') {
            expression = Math.pow(10, eval(expression)).toString();
        } else if (value === 'ln') {
            expression = Math.log(eval(expression)).toString();
        } else if (value === 'log') {
            expression = Math.log10(eval(expression)).toString();
        } else if (value === 'n!') {
            let num = parseInt(eval(expression));
            if (num >= 0) {
                let fact = 1;
                for (let i = 1; i <= num; i++) {
                    fact *= i;
                }
                expression = fact.toString();
            } else {
                expression = 'Error';
            }
        } else if (value === '%') {
            expression = (eval(expression) / 100).toString();
        } else if (value === 'sin') {
            expression = Math.sin(eval(expression) * Math.PI / 180).toFixed(10);
        } else if (value === 'cos') {
            expression = Math.cos(eval(expression) * Math.PI / 180).toFixed(10);
        } else if (value === 'tan') {
            expression = Math.tan(eval(expression) * Math.PI / 180).toFixed(10);
        } else if (value === '(' || value === ')') {
            expression += value;
        } else {
            expression += value;
        }
        updateDisplay();
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});
