define([], function () {

    var Vector3 = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };

    Vector3.create = function (x, y, z) {
        return new Vector3(x, y, z);
    };

    Vector3.prototype = {
        
        copy: function () {
            return new Vector3(this.x, this.y, this.z);
        },

        toArray: function () {
            return [this.x, this.y, this.z];
        },

        add: function (v) {
            return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
        },

        subtract: function (v) {
            return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
        },

        multiply: function (k) {
            return new Vector3(k * this.x, k * this.y, k * this.z);
        },

        distanceTo: function (v) {
            return Math.sqrt(this.distanceToSquared(v));
        },

        distanceToSquared: function (v) {
            var dx = v.x - this.x;
            var dy = v.y - this.y;
            var dz = v.z - this.z;
            return dx * dx + dy * dy + dz * dz;
        },

        magnitude: function () {
            return Math.sqrt(this.magnitudeSquared());
        },

        magnitudeSquared: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },

        crossProduct: function (v) {
            return Vector3.create(
                this.y * v.z - this.z * v.y,
                this.z * v.x - this.x * v.z,
                this.x * v.y - this.y * v.x
            );
        }
    };

    Vector3.ZERO = Vector3.create(0, 0, 0);
    Vector3.ONE = Vector3.create(1, 1, 1);
    Vector3.X = Vector3.create(1, 0, 0);
    Vector3.Y = Vector3.create(0, 1, 0);
    Vector3.Z = Vector3.create(0, 0, 1);

    return Vector3;
});