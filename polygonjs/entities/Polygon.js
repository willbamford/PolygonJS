define(
    [
        'polygonjs/Entity',
        'polygonjs/math/Vector3',
        'polygonjs/Material'
    ],
    function (Entity, Vector3, Material) {

        "use strict";

        var Polygon = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);
            this.type = 'polygon';

            this.vertices = opts.vertices || [];
            this.worldVertices = opts.worldVertices || [];
            this.viewVertices = opts.viewVertices || [];
            this.screenVertices = opts.screenVertices || [];
            this.normal = opts.normal || Vector3.ONE;
            this.worldNormal = this.normal.clone();
            this.isCulled = false;
            this.distanceToCamera = 0;

            this.material = opts.material || Material.create();
        };

        Polygon.create = function (opts) {
            return new Polygon(opts);
        };

        Polygon.prototype = Object.create(Entity.prototype);

        Polygon.prototype.update = function (delta) {
            Entity.prototype.update.call(this, delta);
            this.worldNormal.copy(this.normal).applyMatrix4(this.worldTransform);
            this.worldPosition.center(this.worldVertices);
        };

        return Polygon;
    }
);