export function is(obj: any, type: string) {
  const typeString: string = Object.prototype.toString.call(obj)
  return typeString.substring(8, typeString.length - 1).toLowerCase() === type
}

export function toCamel(str: string) {
  return str.slice(0, 1).toLowerCase() + str.slice(1)
}
