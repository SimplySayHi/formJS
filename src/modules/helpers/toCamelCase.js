
export const toCamelCase = string => {
    return string.replace(/-([a-z])/ig, (all, letter) => { return letter.toUpperCase(); });
}
