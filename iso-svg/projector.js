define(['iso-svg/lib', 'iso-svg/math'], function (lib, math) {

    var projector = {

        surface: null,
        scale: 1,

        create: function (opts) {
            var instance = lib.create(this);
            return instance.init(opts);
        },

        init: function (opts) {
            var self = this;
            if (opts.surface)
                this.surface = opts.surface;
            if (opts.scale)
                this.scale = opts.scale;
            this.project = function (vertex) {
                var point = math.isoGameProject(vertex);
                point = math.scale(point, self.scale);
                return point;
            }
            return this;
        },

        vertex: function (v) {
            var point = this.project(v);
            this.surface.circle(point[0], point[1], 1);
        },

        vertices: function (vertices) {
            var self = this;
            lib.each(vertices, function (v) {
                self.vertex(v);
            });
        },

        polygon: function (vertices) {
            var self = this;
            var points = [];
            lib.each(vertices, function (vertex) {
                var point = self.project(vertex);
                points.push(point);
            });
            this.surface.polygon(points);
        }
    };

    return projector;
});