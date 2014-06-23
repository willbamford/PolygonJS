define(['iso-svg/meshes/Mesh', 'iso-svg/geom/Vector3'], function (Mesh, Vector3) { 

    "use strict";

    describe('Mesh', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var m = Mesh.create({});
                expect(m).not.toBeNull();
            });

            it('should allow initialisation with vertices and faces', function () {
                var opts = {
                    vertices: Vector3.createFromArrays([[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1]]),
                    faces: [[0, 1, 2], [0, 2, 3]]
                }
                var m = Mesh.create(opts);
                expect(m.vertices).toEqual(opts.vertices);
                expect(m.faces).toEqual(opts.faces);
            });
        });
        
        describe('vertices', function () {
            it('should set vertices', function () {
                var m = Mesh.create({});
                var vertices = [[0, 0, 0], [1, 1, 1]];
                m.vertices = vertices;
                expect(m.vertices).toEqual(vertices);
            });
        });

        describe('faces', function () {
            it('should set faces', function () {
                var m = Mesh.create({});
                var faces = [[0, 1, 2], [0, 2, 3]];
                m.faces = faces;
                expect(m.faces).toEqual(faces);
            });
        });

        describe('updateNormals', function () {
            it('should recalculate normals based on vertices and faces', function () {
                var m = Mesh.create({
                    vertices: Vector3.createFromArrays([[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]]),
                    faces: [[0, 1, 2], [0, 2, 3]]
                });
                expect(m.normals.length).toEqual(m.faces.length);

            });
        });

        describe('normalise', function () {
            it('should scale the vertices of the mesh proportionally so that it fits into a 2 by 2 cube centered at zero axis', function () {
                var m = Mesh.create({
                    vertices: Vector3.createFromArrays([
                        [-200, -40, 20],
                        [0, 10, 5],
                        [10, 100, 800]
                    ]),
                    faces: [[0, 1, 2]]
                });
                m.normalise();
                expect(m.vertices[0].equals(
                    Vector3.create(-0.2641509433962264, -0.1761006289308176, -0.9622641509433961)
                )).toBe(true);
            });
        });
    });
});