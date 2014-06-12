define(['iso-svg/lib', 'iso-svg/math'], function (lib, math) {

    var mesh = {

        //   Z
        //   |
        //   |
        //   0-- X
        //  /
        // Y

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
            this.updateNormals();
            return this;
        },

        setVertices: function (vertices) {
            this.vertices = vertices;
        },

        setFaces: function (faces) {
            this.faces = faces;
        },

        updateNormals: function () {
            var self = this, vertices;
            this.normals = [];
            lib.each(this.faces, function (face) {
                vertices = self.getVerticesForFace(face);
                self.normals.push(math.normalFromVertices(
                    vertices[0],
                    vertices[1],
                    vertices[2]
                ));
            });
        },

        eachFace: function (fn) {
            var self = this, vertices, normal;
            lib.each(this.faces, function (face, faceIndex) {
                fn(self.getVerticesForFace(face), self.normals[faceIndex]);
            });
        },

        getVerticesForFace: function (face) {
            var self = this, vertices = [];
            lib.each(face, function (index) {
                vertices.push(self.vertices[index]);
            });
            return vertices;
        }
    };

    return mesh;
});