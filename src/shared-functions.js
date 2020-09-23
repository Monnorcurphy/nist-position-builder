export async function get(url, cb) {
  let response = await fetch(url).then((res) => res.json());
  cb(response);
}

export function urlParams(url, keyword, increment = false) {
  let add = increment ? 1 : 0;
  return url.indexOf(keyword) + keyword.length + add;
}

export function capitalize(string = "") {
  let first = string[0].toUpperCase();
  let rest = string.slice(1).toLowerCase();
  return `${first}${rest}`;
}
