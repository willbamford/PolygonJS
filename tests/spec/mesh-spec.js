define(['iso-svg/Mesh'], function (Mesh) { 

    "use strict";

    describe('Mesh', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var m = Mesh.create({});
                expect(m).not.toBeNull();
            });

            it('should allow initialisation with vertices and faces', function () {
                var opts = {
                    vertices: [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1]],
                    faces: [[0, 1, 2], [0, 2, 3]]
                }
                var m = Mesh.create(opts);
                expect(m.vertices).toEqual(opts.vertices);
                expect(m.faces).toEqual(opts.faces);
            });
        });
        
        describe('setVertices', function () {
            it('should set vertices', function () {
                var m = Mesh.create({});
                var vertices = [[0, 0, 0], [1, 1, 1]];
                m.vertices = vertices;
                expect(m.vertices).toEqual(vertices);
            });
        });

        describe('setFaces', function () {
            it('should set faces', function () {
                var m = Mesh.create({});
                var faces = [[0, 1, 2], [0, 2, 3]];
                m.faces = faces;
                expect(m.faces).toEqual(faces);
            });
        });

        describe('updateNormals', function () {
            it('should recalculate normals based on vertices and faces', function () {
                // Ground square with two triangular faces
                var m = Mesh.create({
                    vertices: [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                    faces: [[0, 1, 2], [0, 2, 3]]
                });
                expect(m.normals.length).toEqual(m.faces.length);

            });
        });
    });
});