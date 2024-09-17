function filter(array, predicate) {
    const result = [];

    for (let item of array) {
        if (predicate(item)) {
            result.push(item);
        }
    }

    return result;
}