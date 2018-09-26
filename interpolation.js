const Interpolation = function () {
    /**
     * Returns the approximate value of f(x) with a value of x between two know values of that function at other points.
     * @param {Number} x point varible
     * @param {Array<Number>} xs Array containing the values for x0 and x1.
     * @param {Array<Number>} fxs Array containing the values for f(x0) and f(x1).
     * @returns {Promise<Number>} Promise object presents Numeric result for approximate value of f(x).
     */
    function linear(x, xs, fxs) {
        if (xs.length !== 2 && fxs.length !== 2) throw "Invalid data";

        for (let i = fxs.length - 1; i >= 0; i--) {
            fxs[i] = Number(fxs[i]);
            if (isNaN(fxs[i])) throw "Non numeric value resived";
        }

        for (let i = xs.length - 1; i >= 0; i--) {
            xs[i] = Number(xs[i]);
            if (isNaN(xs[i])) throw "Non numeric value resived";
        }

        fx = ((fxs[1] - fxs[0]) / (xs[1] - xs[0])) * (x - xs[0]) + fxs[0];
        return fx;
    }

    /**
     * Returns the approximate value of f(x) with a value of x in a set know values of that function at other points. The number of values in the set minus one is equals to the polynomial degree.
     * @param {Number} x Given point varible
     * @param {Array<Number>} xs Array containing the values from x0 to xn.
     * @param {Array<Number>} fxs Array containing the values from f(x0) to f(xn).
     * @returns {Number} Promise object presents Numeric result for approximate value of f(x).
     */
    function lagrange(x, xs, fxs) {
        if (xs.length !== fxs.length || xs.length < 2 || fxs.length < 2)
            throw "Invalid data";

        for (let i = fxs.length - 1; i >= 0; i--) {
            fxs[i] = Number(fxs[i]);
            if (isNaN(fxs[i])) throw "Non numeric value resived";
        }

        for (let i = xs.length - 1; i >= 0; i--) {
            xs[i] = Number(xs[i]);
            if (isNaN(xs[i])) throw "Non numeric value resived";
        }

        /**
         * Lagrange basis polynomials.
         * @param {Number} x Given point varible.
         * @param {Number} i Ensures that xi = xj with yi != yj.
         * @param {Array<Number>} xs Array containing the values from x0 to xn.
         * @returns {Number} Product. Lagrange basis polynomials.
         */
        function Li(x, i, xs) {
            const n = xs.length - 1;
            let prod = 1;
            for (let j = 0; j <= n; j++)
                if (j !== i) prod *= (x - xs[j]) / (xs[i] - xs[j]);
            return prod;
        }

        /**
         * Lagrange combination addition of basis polynomials.
         * @param {Number} x Given point varible.
         * @param {Array<Number>} xs Array containing the values from x0 to xn.
         * @param {Array<Number>} fxs Array containing the values from f(x0) to f(xn).
         * @returns {Number} Addition of the function L(xi) times f(xi) from i = 0 to the length of the data set minus 1.
         */
        function Fn(x, xs, fxs) {
            const n = xs.length - 1;
            let sum = 0;
            for (let i = 0; i <= n; i++) sum += Li(x, i, xs) * fxs[i];
            return sum;
        }

        return Fn(x, xs, fxs);
    }

    function quadratic(x, xs, fxs) {
        if (xs.length !== fxs.length || xs.length < 2 || fxs.length < 2)
            throw "Invalid data";

        for (let i = fxs.length - 1; i >= 0; i--) {
            fxs[i] = Number(fxs[i]);
            if (isNaN(fxs[i])) throw "Non numeric value resived";
        }

        for (let i = xs.length - 1; i >= 0; i--) {
            xs[i] = Number(xs[i]);
            if (isNaN(xs[i])) throw "Non numeric value resived";
        }

        function b1(xs, fxs) {
            return (fxs[1] - fxs[0]) / (xs[1] - xs[0]);
        }

        function b2(xs, fxs) {
            return (((fxs[2] - fxs[1]) / (xs[2] - xs[1])) - b1(xs, fxs)) / (xs[2] - xs[0]);
        }

        return fxs[0] + (b1(xs, fxs) * (x - xs[0])) + (b2(xs, fxs) * (x - xs[0]) * (x - xs[1]));
    }

    return {
        linear: linear,
        lagrange: lagrange,
        quadratic: quadratic
    }

}();