define(
    ['polygonjs/Entity', 'polygonjs/geom/Vector3'],
    function (Vector3, Entity) {

        var Polygon = function () {
            var opts = {};
            Entity.call(this, opts);

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