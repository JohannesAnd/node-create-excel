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

function numberToLetter(col) {
  if (col <= 0)
		throw "col must be more than 0";
	var array = new Array();
	while (col > 0) {
		var remainder = col % 26;
		col /= 26;
		col = Math.floor(col);
		if (remainder === 0) {
			remainder = 26;
			col--;
		}
		array.push(64 + remainder);
	}
	return String.fromCharCode.apply(null, array.reverse());
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

module.exports.colRowToCell = (col, row) => {
  const colLetter = numberToLetter(col);

  return `${colLetter}${row}`;
}
