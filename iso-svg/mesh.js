define(['iso-svg/lib'], function (lib) {

    var mesh = {

        // Z
        // | Y
        // |/
        // 0-- X

        vertices: [],
        faces: [],
        normals: [], // Per face, not vertex

        create: function (opts) {
            var instance = lib.create(this);
            return instance.init(opts);
        },

        init: function (opts) {
            if (opts.vertices)
                this.setVertices(opts.vertices);
            if (opts.faces)
                this.setFaces(opts.faces);
            return this;
        },

        setVertices: function (vertices) {
            this.vertices = vertices;
        },

        setFaces: function (faces) {
            this.faces = faces;
        },

        updateNormals: function () {
            var self = this;
            this.normals = [];
            lib.each(this.faces, function (face) {
                
                self.normals.push([]);
            });
        }
    };

    return mesh;
});