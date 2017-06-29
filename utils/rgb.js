module.exports = (rgb) => {
  let currentString = rgb;

  if (rgb.substr(0,1) === '#') {
    currentString = rgb.substring(1);
  }

  if (currentString.length === 3) {
    let [r, g, b] = currentString;

    r = Math.ceil(parseInt(r, 16) * 17).toString(16).toUpperCase();
    g = Math.ceil(parseInt(g, 16) * 17).toString(16).toUpperCase();
    b = Math.ceil(parseInt(b, 16) * 17).toString(16).toUpperCase();

    if (r.length === 1) r = `0${r}`;
    if (g.length === 1) g = `0${g}`;
    if (b.length === 1) b = `0${b}`;

    return `FF${r}${g}${b}`;

    
  } else if (currentString.length === 6) {
    return `FF${currentString}`;
  }

  throw new Error(`Invalid argument ${rgb} passed to rgb`);
};
