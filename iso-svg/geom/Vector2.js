define([], function () {

    var Vector2 = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Vector2.create = function (x, y) {
        return new Vector2(x, y);
    };

    Vector2.prototype = {
        
        copy: function () {
            return new Vector2(this.x, this.y);
        },

        toArray: function () {
            return [this.x, this.y];
        },

        add: function (v) {
            return new Vector2(this.x + v.x, this.y + v.y);
        },

        subtract: function (v) {
            return new Vector2(this.x - v.x, this.y - v.y);
        },

        multiply: function (k) {
            return new Vector2(k * this.x, k * this.y);
        },

        distanceTo: function (v) {
            return Math.sqrt(this.distanceToSquared(v));
        },

        distanceToSquared: function (v) {
            var dx = v.x - this.x;
            var dy = v.y - this.y;
            return dx * dx + dy * dy;
        }
    };

    Vector2.ZERO = Vector2.create(0, 0);
    Vector2.ONE = Vector2.create(1, 1);
    Vector2.X = Vector2.create(1, 0);
    Vector2.Y = Vector2.create(0, 1);

    return Vector2;
});