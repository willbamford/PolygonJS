define(
    ['polygonjs/Entity', 'polygonjs/geom/Vector3'],
    function (Entity, Vector3) {

        "use strict";

        var Polygon = function () {
            var opts = {};
            Entity.call(this, opts);
            this.type = 'polygon';
            this.localVertices = [];
            this.normal = null;
            this.vertices = null;
        };

        Polygon.create = function () {
            return new Polygon();
        };

        Polygon.prototype = Object.create(Entity.prototype);

        return Polygon;
    }
);