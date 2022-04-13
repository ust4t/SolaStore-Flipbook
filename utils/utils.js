export const encodeURLString = (url) => {
  return url
    .toLowerCase()
    .replace(/[`~!@#$%^&*()_|+\-=? ;'",.<>\{\}\[\]\\\/]/gi, "-");
};

export const replaceUnescaped = (text) => {
  return text
    .replace(/ı/g, "i")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c");
};
