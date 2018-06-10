let cDisplay = document.querySelector('#display');
let operList = ['+', '-', '*', '/'];

// numbers
let cNums = document.querySelectorAll('.num');
for (let i = 0; i < cNums.length; i++) {
  cNums[i].addEventListener('click', function () {
    cDisplay.textContent == '0' ? cDisplay.textContent = cNums[i].value : cDisplay.textContent += cNums[i].value;
  });
}

// decimals
let cDec = document.querySelector('#decimal');
cDec.addEventListener('click', function () {
  let lastDig = cDisplay.textContent.slice(-1);
  if (cDisplay.textContent.indexOf('.') > -1) {
    // find the position of the last decimal used
    let decPos = cDisplay.textContent.indexOf('.');
    let decLast;
    while (decPos !== -1) {
      decLast = decPos;
      decPos = cDisplay.textContent.indexOf('.', decPos + 1);
    }
    // find the position of the last operator used
    let operLast, cLen = cDisplay.textContent.length;
    for (let i = cLen - 1;i >= 0;i--) {
      if(operList.indexOf(cDisplay.textContent[i]) > -1) {
        operLast = i;
        break;
      }
    }
    // did we use an operator after the last decimal? i.e is this a new number. 
    if (operLast > decLast) {
      cDisplay.textContent += cDec.value;
    }
  } else if (operList.indexOf(lastDig) === -1) {
    cDisplay.textContent = cDisplay.textContent += cDec.value;
  }
});

// operators
let cOperators = document.querySelectorAll('.operator');
for (let i = 0; i < cOperators.length; i++) {
  cOperators[i].addEventListener('click', function () {
    let operUsed = cDisplay.textContent.slice(-1);
    if (operList.indexOf(operUsed) > -1) {
      let arr = cDisplay.textContent.split('');
      arr[arr.length - 1] = cOperators[i].value;
      cDisplay.textContent = arr.join('');
    } else {
      cDisplay.textContent += cOperators[i].value;
    }
  });
}

let cEquals = document.querySelector('#equals');
cEquals.addEventListener('click', function () {
  // check if last digit is operator, if it is add a zero
  if (operList.indexOf(cDisplay.textContent.slice(-1)) > -1) {
    cDisplay.textContent += '0';
  }
  cDisplay.textContent = eval(cDisplay.textContent);
});

// clear

let cClear = document.querySelector('#clear');
cClear.addEventListener('click', function () {
  cDisplay.textContent = '0';
});