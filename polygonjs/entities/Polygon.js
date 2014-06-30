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

            // this.worldVertices = null;
        };

        Polygon.create = function (opts) {
            return new Polygon(opts);
        };

        Polygon.prototype = Object.create(Entity.prototype);

        return Polygon;
    }
);