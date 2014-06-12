define([], function () {

    "use strict";

    var math = {

        scale: function (v, s) {
            if (v) {
                for (var i = 0; i < v.length; i++)
                    v[i] *= s;
            }
            return v;
        },

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

        dotProduct: function (a, b) {
            var v = 0;
            if (a && b && (a.length === b.length)) {
                for (var i = 0; i < a.length; i++)
                    v += a[i] * b[i];
            }
            return v;
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

        normalFromVertices: function (v1, v2, v3) {
            var a = this.subtract(v2, v1);
            var b = this.subtract(v3, v1);
            return this.normal(a, b);
        },

        orthoProject: function (v) {
            return [v[1], -v[2]]; // (y, z)
        },

        isoProject: function (v) {
            var vx = v[0], vy = v[1], vz = -v[2];
            var alpha = Math.PI / 6; // 30 degrees
            var beta = alpha;
            var x = (vx * Math.cos(alpha)) - (vy * Math.cos(beta));
            var y = (vx * Math.sin(alpha)) + (vy * Math.sin(beta)) + vz;
            return [x, y];
        },

        isoGameProject: function (v) {
            var vx = v[0], vy = v[1], vz = -v[2];
            var x = vx - vz;
            var y = 0.5 * (vx + vz) + vy;
            return [x, y];
        }

    };

    return math;
});