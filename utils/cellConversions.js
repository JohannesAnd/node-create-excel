function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function letterToNumber(letters) {
  const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let i, j, result = 0;

  for (i = 0, j = letters.length - 1; i < letters.length; i += 1, j -= 1) {
    result += Math.pow(base.length, j) * (base.indexOf(letters[i]) + 1);
  }

  return result;
}

module.exports.cellToYX = cell => {
  let i = 0;
  let cond = true;
  while (cond) {
    if (isNumber(cell[i])) {
      i = i - 1;
      cond = false;
    }
    i++;
  }
  const y = letterToNumber(cell.substring(0,i));
  const x = Number(cell.substring(i));
  return { y, x };
}
