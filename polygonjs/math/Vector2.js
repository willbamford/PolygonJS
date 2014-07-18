define(['polygonjs/math/MissingMath'], function (MissingMath) {

    "use strict";

    var Vector2 = function (x, y) {
        Vector2.instanceCount++;
        this.x = x;
        this.y = y;
    };

    Vector2.instanceCount = 0;

    Vector2.create = function (x, y) {
        return new Vector2(x, y);
    };

    Vector2.prototype = {
        
        clone: function () {
            return new Vector2(this.x, this.y);
        },

        copy: function (v) {
            this.x = v.x;
            this.y = v.y;
            return this;
        },

        equals: function (v) {
            return (MissingMath.equals(this.x, v.x) && MissingMath.equals(this.y, v.y));
        },

        toArray: function () {
            return [this.x, this.y];
        },

        add: function (v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        },

        subtract: function (v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        },

        multiply: function (k) {
            this.x = this.x * k;
            this.y = this.y * k;
            return this;
        },

        distanceTo: function (v) {
            return Math.sqrt(this.distanceToSquared(v));
        },

        distanceToSquared: function (v) {
            var dx = v.x - this.x;
            var dy = v.y - this.y;
            return dx * dx + dy * dy;
        },

        magnitude: function () {
            return Math.sqrt(this.magnitudeSquared());
        },

        magnitudeSquared: function () {
            return this.x * this.x + this.y * this.y;
        }
    };

    Vector2.ZERO = Vector2.create(0, 0);
    Vector2.ONE = Vector2.create(1, 1);
    Vector2.X = Vector2.create(1, 0);
    Vector2.Y = Vector2.create(0, 1);

    return Vector2;
});