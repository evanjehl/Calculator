var equation = [''];

var operators = {
  'add':'+',
  'subtract':'-',
  'multiply':'*',
  'divide':'/',
  'equals':'='
};

function press(id) {
  $('#' + id).css({
    'transform': 'translateY(4px)',
    'box-shadow':'0px 0px 0px'
  });
  evaluate(id);
}

function depress(id) {
  $('#' + id).css({
    'transform': 'translateY(0px)',
    'box-shadow':'0px 4px 0px #44000E'
  });
}
  
function isOperator(id) {
  if (id === 'add' || id === 'subtract' || id === 'multiply' || id === 'divide' || id === 'equals' || id === '+' || id === '-' || id === '*' || id === '/' || id === '=') {
    return true;
  }
  return false;
}

function evaluate(id) {
  if (equation.indexOf('=') === -1) {    
    if ((!isNaN(parseInt(id)) || id === 'zero' || id === 'point') && equation[equation.length - 1].length <= 7) {
      if (isOperator(equation[equation.length - 1])) {
        equation.push('');
      }
      if (id === 'zero') {
        if (equation[equation.length - 1].length > 1 || equation[equation.length - 1] !== '0') {
          equation[equation.length - 1] += Number(0).toString();
        }
      } else if (id === 'point') {
        if (equation[equation.length - 1].indexOf('.') === -1) {
          if (equation[equation.length - 1] === '') {
            equation[equation.length - 1] += '0.'
          } else {
            equation[equation.length - 1] += '.';
          }
        }
      } else if (equation[equation.length - 1] !== '0') {
        equation[equation.length - 1] += Number(id).toString();
      }
    } else if (isOperator(id)) {
      if (!isNaN(parseFloat(equation[equation.length - 1])) && !isNaN(parseInt(equation[equation.length - 1]))) {
        equation.push(operators[id]);
        if (id === 'equals') {
          var sum = equation.reduce(function(a, b) {
            if (!isNaN(parseFloat(a))) {
              switch(b) {
                case '+':
                  return function(c) {
                    return parseFloat(a) + parseFloat(c);
                  }
                case '-':
                  return function(c) {
                    return parseFloat(a) - parseFloat(c);
                  }
                case '*':
                  return function(c) {
                    return parseFloat(a) * parseFloat(c);
                  }
                case '/':
                  return function(c) {
                    if (c == 0) return 'ERROR DIV 0';
                    return parseFloat(a) / parseFloat(c);
                  }
                case '=':
                  return parseFloat(a);
                  break;
              }
            } else if (a === 'ERROR DIV 0') {
              return 'ERROR DIV 0';
            } else {
              return a(b);
            }
          });
          equation.push(sum);
        }
      }
    } else if (id === 'ce') {
      if (equation.length > 1) {
        if (equation[equation.length - 1] === '') {
          equation = equation.slice(0, equation.length - 2).concat([''])
        } else {
          equation = equation.slice(0, equation.length - 1).concat(['']);
        }
      } else {
        equation = [''];
      }
    }
  } else if (id === 'ce') {
    equation = [''];
  }
  if (id === 'ac') {
    equation = [''];
  }
  updateScreen(equation);
}

function updateScreen(equation) {
  if (equation[0] === '') {
    $('#input').html('0');
    $('#equation').html('0');
  } else {
    if (equation[equation.length - 1] > 8 && equation.indexOf('=') > -1) {
      equation[equation.length - 1] = Number(equation[equation.length - 1]).toExponential(2);
    }
    var eqStr = '';
    for (var i = 0; i < equation.length; i++) {
      eqStr += equation[i];
    }
    if (eqStr.length > 20) {
      if (eqStr.length > 60) {
        eqStr = eqStr.substring(eqStr.length - 60, eqStr.length);
      }
      var newStr = '';
      for (var i = 0; i < Math.floor(eqStr.length / 20); i++) {
        var next = 20 * (i + 1);
        newStr += eqStr.substring(20 * i, next) + '\n';
      }
      newStr += eqStr.substring(next, next + eqStr.length % 20);
      eqStr = newStr;
    }
    var display = equation[equation.length - 1] === '' ? '0':equation[equation.length - 1];
    $('#input').html(display);
    $('#equation').html(eqStr);
  }
}

$("button").mousedown(function() {
  press(this.id);
});

$("button").mouseup(function() {
  depress(this.id);
});

$(document).keydown(function(e) {
  var key = e.which;
  switch (key) {
    case 8:
      press('ce');
      break;
    case 13:
      press('equals');
      break;
    case 46:
      press('ac');
      break;
    case 48:
      press('zero');
      break;
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      if (key === 56 && e.shiftKey) {
        press('multiply');
      } else {
        press(key - 48);
      }
      break;
    case 65:
      press('ac');
      break;
    case 67:
      press('ce');
      break;
    case 88:
      press('multiply');
      break;
    case 96:
      press('zero');
      break;
    case 97:
    case 98:
    case 99:
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
      press(key - 96);
      break;
    case 106:
      press('multiply');
      break;
    case 107:
      press('add');
      break;
    case 109:
      press('subtract');
      break;
    case 110:
      press('point');
      break;
    case 111:
      press('divide');
      break;
    case 187:
      if (e.shiftKey) {
        press('add');
      } else {
        press('equals');
      }
      break;
    case 189:
      press('subtract');
      break;
    case 190:
      press('point');
      break;
    case 191:
      press('divide');
      break;  
  }     
});

$(document).keyup(function(e) {
  var key = e.which;
  switch (key) {
    case 8:
      depress('ce');
      break;
    case 13:
      depress('equals');
      break;
    case 46:
      depress('ac');
      break;
    case 48:
      depress('zero');
      break;
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      if (key === 56 && e.shiftKey) {
        depress('multiply');
      } else {
        depress(key - 48);
      }
      break;
    case 65:
      depress('ac');
      break;
    case 67:
      depress('ce');
      break;
    case 88:
      depress('multiply');
      break;
    case 96:
      depress('zero');
      break;
    case 97:
    case 98:
    case 99:
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
      depress(key - 96);
      break;
    case 106:
      depress('multiply');
      break;
    case 107:
      depress('add');
      break;
    case 109:
      depress('subtract');
      break;
    case 110:
      depress('point');
      break;
    case 111:
      depress('divide');
      break;
    case 187:
      if (e.shiftKey) {
        depress('add');
      } else {
        depress('equals');
      }
      break;
    case 189:
      depress('subtract');
      break;
    case 190:
      depress('point');
      break;
    case 191:
      depress('divide');
      break;  
  }
});