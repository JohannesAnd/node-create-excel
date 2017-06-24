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

module.exports.cellToColRow = cell => {
  let i = 0;
  let cond = true;
  while (cond) {
    if (isNumber(cell[i])) {
      i = i - 1;
      cond = false;
    }
    i++;
  }
  const col = letterToNumber(cell.substring(0,i));
  const row = Number(cell.substring(i));
  return { row, col };
}
