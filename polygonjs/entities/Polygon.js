define(
    [
        'polygonjs/Entity',
        'polygonjs/math/Vector3',
        'polygonjs/Material',
        'polygonjs/math/Color'
    ],
    function (Entity, Vector3, Material, Color) {

        "use strict";

        var Polygon = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);
            this.type = 'polygon';

            this.vertices = opts.vertices || [];
            this.worldVertices = opts.worldVertices || [];
            this.viewVertices = opts.viewVertices || [];
            this.screenVertices = opts.screenVertices || [];
            this.normal = Vector3.ONE.clone();
            this.worldNormal = this.normal.clone();
            this.isCulled = false;
            this.distanceToCamera = 0;

            this.material = opts.material || Material.create();
            this.color = Color.BLACK.clone();

            this.updateNormal();
        };

        Polygon.create = function (opts) {
            return new Polygon(opts);
        };

        Polygon.prototype = Object.create(Entity.prototype);

        Polygon.prototype.update = function (delta) {
            Entity.prototype.update.call(this, delta);
            this.worldNormal.copy(this.normal).applyMatrix4(this.worldTransform).normalise();
            this.worldPosition.center(this.worldVertices);
        };

        Polygon.prototype.updateNormal = function () {
            var v = this.vertices;
            if (v.length >= 3)
                this.normal.normalFromPositionVectors(v[0], v[1], v[2]);
        };

        return Polygon;
    }
);
