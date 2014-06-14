define(['iso-svg/lib', 'iso-svg/math'], function (lib, math) {

    "use strict";

    var Projector = function (opts) {
        this.surface = null;
        this.scale = 1;
        this.eye = null;

        var self = this;
        
        this.surface = opts.surface;
        this.scale = opts.scale;
        this.camera = opts.camera;
        return this;
    };

    Projector.create = function (opts) {
        return new Projector(opts);
    };

    Projector.prototype = {

        vertex: function (vertex) {
            var point = this.project(vertex);
            this.surface.circle(point[0], point[1], 1);
        },

        vertices: function (vertices) {
            var self = this;
            lib.each(vertices, function (vertex) {
                self.vertex(vertex);
            });
        },

        face: function (vertices, normal) {

            var self = this, points = [], dp, camera = this.camera;
            lib.each(vertices, function (vertex) {
                points.push(camera.project(vertex));
            });

            dp = math.dotProduct(normal, camera.facingVector);
            if (dp <= 0)
                this.surface.polygon(points);
        }
    };

    return Projector;
});