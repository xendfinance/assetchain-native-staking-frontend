export const toFixed = x => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
};

export function numberWithCommaswithoutdecimals(x) {
  if (x) {
    let number = x.toFixed(2);
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return 0;
}

export const validateamount = value => {
  return /^[1-9]\d*$/.test(value);
};
