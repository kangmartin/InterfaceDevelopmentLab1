function sum(...terms) {
    if (terms.length === 0) {
        throw new Error('At least one number is expected');
    }
    return terms.reduce((acc, term) => acc + term, 0);
}