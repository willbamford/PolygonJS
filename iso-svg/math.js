define([], function () {

    "use strict";

    var math = {

        magSquared: function (a) {
            return (a[0] * a[0]) + (a[1] * a[1]) + (a[2] * a[2]);
        },

        magnitude: function (a) {
            return Math.sqrt(this.magSquared(a));
        },

        crossProduct: function (a, b) {
            return [
                a[1] * b[2] - a[2] * b[1],
                a[2] * b[0] - a[0] * b[2],
                a[0] * b[1] - a[1] * b[0]];
        },

        subtract: function (a, b) {
            return [
                b[0] - a[0],
                b[1] - a[1],
                b[2] - a[2]
            ];
        },

        normalise: function (a) {
            var mag = this.magnitude(a);
            if (mag === 0)
                return null;
            a[0] = a[0] / mag;
            a[1] = a[1] / mag;
            a[2] = a[2] / mag;
            return a;
        },

        normal: function (a, b) {
            var v = this.crossProduct(a, b);
            return this.normalise(v);
        },

        normalFromPoints: function (p1, p2, p3) {
            var a = this.subtract(p2, p1);
            var b = this.subtract(p3, p1);
            return this.normal(a, b);
        } 
    };

    return math;
});