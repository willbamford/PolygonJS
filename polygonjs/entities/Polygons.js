define(
    [
        'polygonjs/Entity',
        'polygonjs/entities/Polygon',
        'polygonjs/lib'
    ],
    function (Entity, Polygon, lib) {

        var Polygons = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);

        };

        Polygons.create = function (opts) {
            return new Polygons(opts);
        };

        Polygons.createFromMesh = function (mesh) {
            var polygons = new Polygons();
            mesh.eachFace(function (vertices, normal) {
                var polygon = Polygon.create({
                    vertices: vertices,
                    normal: normal
                });
                polygons.addChild(polygon);
            });
            return polygons;
        };

        Polygons.prototype = Object.create(Entity.prototype);

        return Polygons;
    }
);