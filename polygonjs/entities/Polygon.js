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
            this.worldVertices = opts.worldVertices || [];
            this.viewVertices = opts.viewVertices || [];
            this.screenVertices = opts.screenVertices || [];
            this.normal = opts.normal || Vector3.ONE;
            this.viewNormal = this.normal.clone();
            this.isCulled = false;
        };

        Polygon.create = function (opts) {
            return new Polygon(opts);
        };

        Polygon.prototype = Object.create(Entity.prototype);

        // TODO: test
        Polygon.prototype.update = function (delta) {
            Entity.prototype.update.call(this, delta);
            
        };

        return Polygon;
    }
);