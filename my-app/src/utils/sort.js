export const sortArray = (array, key) => {
    return Array.from(array).sort((a, b) => a[key].localeCompare(b[key]))
}