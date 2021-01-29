export function isObject(param) {
  return Object.prototype.toString.call(param) === '[object Object]';
}

export function isString(param) {
  return typeof param === 'string';
}

export function isArray(param) {
  return Array.isArray(param);
}
