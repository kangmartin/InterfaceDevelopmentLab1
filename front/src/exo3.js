function map(array, transform) {
    const result = [];

    for (let item of array) {
        result.push(transform(item));
    }

    return result;
}