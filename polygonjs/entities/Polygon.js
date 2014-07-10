define(
    [
        'polygonjs/Entity',
        'polygonjs/geom/Vector3'
    ],
    function (Entity, Vector3) {

        "use strict";

        var Polygon = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);
            this.type = 'polygon';

            this.vertices = opts.vertices || [];
            this.normal = opts.normal || Vector3.ONE;

            // this.initVertices();
        };

        Polygon.create = function (opts) {
            return new Polygon(opts);
        };

        Polygon.prototype = Object.create(Entity.prototype);

        // Polygon.prototype.initVertices = function () {
            // this.worldVertices = [];
            // this.viewVertices = [];
            // this.screenVertices = [];
            // var i = this.vertices.length;
            // while (--i >= 0) {
            //     // this.worldVertices.push(Vector3.create(0, 0, 0));
            //     // this.viewVertices.push(Vector3.create(0, 0, 0));
            //     // this.screenVertices.push(Vector3.create(0, 0, 0));
            // }
        // };

        // Polygon.prototype.update = function (delta) {
        //     var vertices = this.vertices,
        //         worldVertices = this.worldVertices,
        //         vertex, worldVertex,
        //         i = vertices.length,
        //         transform = this.getWorldTransform();

        //     // Apply world transformation
        //     while (--i >= 0) {
        //         vertex = vertices[i];
        //         worldVertices[i] = transform.multiplyVector(vertex); // TODO: slow!
        //     }
        // };

        // Polygon.prototype.draw = function (camera, surface) {

        //     // ...

        // };

        return Polygon;
    }
);