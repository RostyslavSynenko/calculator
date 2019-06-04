const display = document.querySelector('.display');
const digits = document.querySelectorAll('.digits');
const opers = document.querySelectorAll('.opers');
const backspace = document.querySelector('.backspace');
const cleanEntry = document.querySelector('.clean-entry');
const plusMinus = document.querySelector('.plus-minus');
const squareRoot = document.querySelector('.square-root');
const point = document.querySelector('.point');
const eq = document.querySelector('.eq');


digits.forEach( btn => btn.addEventListener('click', digitPressed) );
opers.forEach( btn => btn.addEventListener('click', operPressed) );

function digitPressed(e) {
    e.preventDefault();
    
    if(display.value === '0') {
        display.value = '';
    }
    
    if(display.value.length > 13) {
        alert('Error. Max. length is 14 digits');
        return;
    }
    
    display.value += e.target.innerText;
}

function operPressed(e) {
    e.preventDefault();
    
    const lastSymbol = display.value[display.value.length - 1];
    
    if(display.value.length > 13) {
        alert('Error. Max. length is 14 digits');
        return;
    }
    
    if(lastSymbol === '/'
        || lastSymbol === '*'
        || lastSymbol === '+'
        || lastSymbol=== '-'
        || lastSymbol === '.') {
        display.value = display.value.slice(0, display.value.length - 1) + e.target.innerText;
        return;
    }
    
    display.value += e.target.innerText;
}

function eqPressed(e) {
    e.preventDefault();
    
    const lastSymbol = display.value[display.value.length - 1];
    
    if(display.value[display.value.length - 2] === '/' 
        && lastSymbol === '0') {
            alert('Division by zero is impossible')
            display.value = '0';
            return;
    }
    
    if(lastSymbol === '/'
        || lastSymbol === '*'
        || lastSymbol === '+'
        || lastSymbol === '-' ) {
        
        display.value = display.value.slice(0, display.value.length - 1);
    }
    
    if(eval(display.value).length > 13) {
        alert('Error. Answer is longer then 14 digits.');
    }
    
    return display.value = eval(display.value);
}

eq.addEventListener('click', eqPressed);

function deleteLastSymbol(e) {
    e.preventDefault();
    
    if(display.value.length > 0) {
        display.value = display.value.slice(0, display.value.length - 1);
    }
    if(!display.value.length) {
        display.value = '0';
    }
}

backspace.addEventListener('click', deleteLastSymbol);

function cleanEntryFunc(e) {
    e.preventDefault();
    
    display.value = '0';
}

cleanEntry.addEventListener('click', cleanEntryFunc);

function putPoint(e) {
    e.preventDefault();
    
    const lastSymbol = display.value[display.value.length - 1];
    
    if(lastSymbol === '/'
        || lastSymbol === '*'
        || lastSymbol === '+'
        || lastSymbol=== '-') {
        return;    
    }
    
    if(display.value.includes('.')) {
        return;
    }
    
    
    
    display.value += '.';
}

point.addEventListener('click', putPoint);

function findSquareRoot(e) {
    e.preventDefault();
    
    display.value = Math.sqrt(eqPressed(e));
}

squareRoot.addEventListener('click', findSquareRoot);

function changeExpressionValue(e) {
    e.preventDefault();

    if( isNumeric(display.value) ) {
        display.value = display.value * -1;
    } else {
        alert('Sorry, but doesn\'t work in expression.\n It works only with single number');
    }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

plusMinus.addEventListener('click', changeExpressionValue);