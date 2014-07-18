define([], function () {

    "use strict";

    var precision = 1e-6;

    var MissingMath = {

        equals: function (a, b, p) {
            return Math.abs(a - b) < (p || precision);
        },

        clamp: function (value, min, max) {
            return Math.max(min, Math.min(max, value));
        }
    };

    return MissingMath;
});