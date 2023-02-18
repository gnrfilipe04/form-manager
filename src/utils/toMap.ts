export const toMap = (array: Array<any>, key: string, initialize?: Object) => {
    return array.reduce((acc, item) => ({ ...acc, [item[key]]: item }), initialize || {})
}