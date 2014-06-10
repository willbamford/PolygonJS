define(['iso-svg/lib', 'iso-svg/math'], function (lib, math) {

    var projector = {

        surface: null,
        scale: 1,

        create: function (opts) {
            var instance = lib.create(this);
            return instance.init(opts);
        },

        init: function (opts) {
            if (opts.surface)
                this.surface = opts.surface;
            if (opts.scale)
                this.scale = opts.scale;
            return this;
        },

        vertex: function (v) {
            var coords = math.isoProject(v);
            coords = math.scale(coords, this.scale);
            this.surface.circle(coords[0], coords[1], 1);
        },

        vertices: function (vertices) {
            var self = this;
            lib.each(vertices, function (v) {
                self.vertex(v);
            });
        }
    };

    return projector;
});