define(['iso-svg/lib', 'iso-svg/math'], function (lib, math) {

    var projector = {

        surface: null,
        scale: 1,
        eye: null,

        create: function (opts) {
            var instance = lib.create(this);
            return instance.init(opts);
        },

        init: function (opts) {
            var self = this;
            if (opts.surface) this.surface = opts.surface;
            if (opts.scale) this.scale = opts.scale;
            self.eye = math.normalise([1, 1, 1]);
            this.project = function (vertex) {
                var point = math.isoProject(vertex);
                point = math.scale(point, self.scale);
                return point;
            }
            return this;
        },

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
            var self = this, points = [], dp;
            lib.each(vertices, function (vertex) {
                // console.log('vertex: ' + vertex);
                points.push(self.project(vertex));
                // console.log('point: ' + self.project(vertex));
            });
            // console.log('normal: ' + normal);
            // console.log('points: ' + points);
            dp = math.dotProduct(normal, this.eye);
            console.log('dp: ' + dp);
            if (dp > 0)
                this.surface.polygon(points);
        }
    };

    return projector;
});