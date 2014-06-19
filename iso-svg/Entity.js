define(
    [
        'iso-svg/lib',
        'iso-svg/geom/Vector3'
    ],
    function (lib, Vector3) {

        "use strict";

        var Entity = function (opts) {
            this.parent = null;

            this.position = Vector3.ZERO.copy();

            // this.rotation = Matrix3.IDENTITY.copy(); //Matrix3.copy(Matrix3.IDENTITY); // Matrix3.create([
            //     // [1, 0, 0],
            //     // [0, 1, 0],
            //     // [0, 0, 1]
            // //] /* Matrix3.IDENTITY */);
            // this.scale = Vector3.create(Vector3.IDENTITY);

            // [
            //     [1, 0, 0],
            //     [0, 1, 0],
            //     [0, 0, 1]
            // ];
            // this.scale = Vector3.x(){x: 1, y: 1, z: 1};

            this.scale = Vector3.ONE.copy();

            this.children = [];
        };

        Entity.create = function (opts) {
            return new Entity(opts);
        };

        // Entity.prototype.rotateBy = function (ax, ay, az) {

        // };

        // Entity.prototype.rotateByX = function (ax) {

        // };

        // Entity.prototype.rotateByY = function (ay) {

        // };

        // Entity.prototype.rotateByZ = function (az) {

        // };

        // Entity.prototype.moveBy = function (dx, dy, dz) {

        // };

        // Entity.prototype.moveX = function (dx) {

        // };

        // Entity.prototype.moveY = function (dy) {

        // };

        // Entity.prototype.moveZ = function (dz) {

        // };

        // Entity.prototype.scaleBy = function (sx, sy, sz) {

        // };

        // Entity.prototype.scaleByX = function (sx) {

        // };

        // Entity.prototype.scaleByY = function (sy) {

        // };

        // Entity.prototype.scaleByZ = function (sz) {

        // };

        return Entity;
    }
);