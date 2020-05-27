
export const getSplitChar = string => {
    // MATCH ANY NON-DIGIT CHAR
    const separator = string.match(/\D/);
    return (separator && separator.length > 0) ? separator[0] : null;
}
