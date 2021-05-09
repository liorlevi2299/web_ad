class Line {
    a;
    b;
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    f(x) {
        return a * x + b;
    }
}
module.exports = Line;