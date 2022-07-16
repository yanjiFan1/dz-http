export function getStringParams(data) { //eslint-disable-line
  let arr = [];
  for (let key in data) { //eslint-disable-line
    if ({}.hasOwnProperty.call(data, key)) {
      let item = data[key];
      arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
    }
  }
  return arr.join('&');
}
